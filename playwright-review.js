const { chromium } = require('playwright');

async function runVisualReview() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  const results = {
    fontSizes: [],
    cardInconsistencies: [],
    heroSections: [],
    sectionBackgrounds: [],
    overallIssues: []
  };

  const baseUrl = 'http://localhost:3000';
  
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About' },
    { path: '/services', name: 'Services' },
    { path: '/services/website-design', name: 'Service - Website Design' },
    { path: '/services/voice-ai', name: 'Service - Voice AI' },
    { path: '/services/ai-automation', name: 'Service - AI Automation' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' },
    { path: '/portfolio', name: 'Portfolio' }
  ];

  // Get blog slugs from the blog listing page
  console.log('=== Getting blog post slugs ===');
  await page.goto(`${baseUrl}/blog`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const blogLinks = await page.$$eval('a[href^="/blog/"]', links => 
    [...new Set(links.map(l => l.getAttribute('href')))]
  );
  
  for (const link of blogLinks.slice(0, 2)) {
    pages.push({ path: link, name: `Blog Post${link}` });
  }

  console.log('\n=== Starting Visual Review ===\n');

  for (const { path, name } of pages) {
    console.log(`\n--- Reviewing: ${name} (${path}) ---\n`);
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    // 1. Check for small font sizes
    console.log('Checking font sizes...');
    const smallFonts = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const smallText = [];
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);
        const text = el.textContent?.trim().substring(0, 50);
        
        // Only check elements with actual text content
        if (text && text.length > 0) {
          // Check for fonts smaller than 16px (12pt)
          if (fontSize > 0 && fontSize < 16) {
            const rect = el.getBoundingClientRect();
            // Only include visible elements
            if (rect.width > 0 && rect.height > 0) {
              smallText.push({
                tag: el.tagName,
                fontSize: fontSize,
                text: text,
                parent: el.parentElement?.tagName || 'unknown'
              });
            }
          }
        }
      });
      
      return smallText;
    });
    
    if (smallFonts.length > 0) {
      results.fontSizes.push({
        page: name,
        elements: smallFonts.slice(0, 10) // Limit per page
      });
      console.log(`  Found ${smallFonts.length} elements with font < 16px`);
      smallFonts.slice(0, 5).forEach(f => {
        console.log(`    - ${f.tag}: ${f.fontSize}px - "${f.text}..."`);
      });
    }

    // 2. Check for card components
    console.log('Checking card components...');
    const cards = await page.evaluate(() => {
      const cards = [];
      
      // Find card-like elements (shadcn Card, or divs with card-like classes)
      document.querySelectorAll('[class*="Card"], [class*="card"], .overflow-hidden.bg-white\\/40').forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        
        // Get padding
        const paddingTop = parseFloat(style.paddingTop);
        const paddingBottom = parseFloat(style.paddingBottom);
        const paddingLeft = parseFloat(style.paddingLeft);
        const paddingRight = parseFloat(style.paddingRight);
        
        // Get margin
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        
        cards.push({
          index: i,
          tag: el.tagName,
          className: el.className.substring(0, 100),
          height: rect.height,
          width: rect.width,
          padding: { top: paddingTop, bottom: paddingBottom, left: paddingLeft, right: paddingRight },
          margin: { top: marginTop, bottom: marginBottom },
          visible: rect.width > 0 && rect.height > 0
        });
      });
      
      return cards;
    });
    
    if (cards.length > 0) {
      const visibleCards = cards.filter(c => c.visible);
      console.log(`  Found ${visibleCards.length} card components`);
      
      // Check for inconsistencies
      const heights = visibleCards.map(c => c.height);
      const widths = visibleCards.map(c => c.width);
      const paddingTop = visibleCards.map(c => c.padding.top);
      const paddingBottom = visibleCards.map(c => c.padding.bottom);
      
      const heightVariance = Math.max(...heights) - Math.min(...heights);
      const widthVariance = Math.max(...widths) - Math.min(...widths);
      
      if (heightVariance > 20 || widthVariance > 20) {
        results.cardInconsistencies.push({
          page: name,
          type: 'size_variance',
          details: {
            heights,
            widthVariance,
            heightVariance,
            minHeight: Math.min(...heights),
            maxHeight: Math.max(...heights)
          }
        });
        console.log(`  ⚠ Size variance detected - Height range: ${Math.min(...heights).toFixed(0)}px - ${Math.max(...heights).toFixed(0)}px`);
      }
    }

    // 3. Check hero sections
    console.log('Checking hero section...');
    const heroInfo = await page.evaluate(() => {
      const heroes = [];
      
      // Find sections that look like heroes (typically first section with bg-midnight-plum or large heading)
      document.querySelectorAll('section').forEach((section, i) => {
        const style = window.getComputedStyle(section);
        const bgColor = style.backgroundColor;
        const rect = section.getBoundingClientRect();
        
        // Check if it has a heading inside
        const h1 = section.querySelector('h1');
        const hasGradient = section.querySelector('[class*="gradient"]') !== null;
        const hasRadial = section.innerHTML.includes('radial-gradient');
        const hasImage = section.querySelector('img, [class*="bg-["]') !== null;
        
        if (h1 && rect.height > 200) {
          heroes.push({
            index: i,
            backgroundColor: bgColor,
            height: rect.height,
            hasH1: true,
            h1Text: h1.textContent?.trim().substring(0, 60),
            hasGradientBackground: hasRadial || hasGradient,
            hasBackgroundImage: hasImage,
            isPlain: !hasRadial && !hasGradient && !hasImage
          });
        }
      });
      
      return heroes;
    });
    
    if (heroInfo.length > 0) {
      results.heroSections.push({
        page: name,
        heroes: heroInfo
      });
      heroInfo.forEach(h => {
        console.log(`  Hero #${h.index + 1}: height=${h.height}px, gradient=${h.hasGradientBackground}, image=${h.hasBackgroundImage}, plain=${h.isPlain}`);
      });
    }

    // 4. Check section backgrounds
    console.log('Checking section backgrounds...');
    const sections = await page.evaluate(() => {
      const sectionData = [];
      
      document.querySelectorAll('section').forEach((section, i) => {
        const style = window.getComputedStyle(section);
        const bgColor = style.backgroundColor;
        const rect = section.getBoundingClientRect();
        const children = section.children.length;
        const hasDecorativeElements = section.querySelector('[class*="glow"], [class*="accent"], [class*="floating"], [class*="shape"]') !== null;
        
        // Calculate if background is plain white
        const isPlainWhite = bgColor === 'rgb(255, 255, 255)' || bgColor === 'rgba(0, 0, 0, 0)';
        
        sectionData.push({
          index: i,
          backgroundColor: bgColor,
          height: rect.height,
          childCount: children,
          hasDecorations: hasDecorativeElements,
          isPlainWhite
        });
      });
      
      return sectionData;
    });
    
    if (sections.length > 0) {
      results.sectionBackgrounds.push({
        page: name,
        sections: sections.filter(s => s.height > 100)
      });
      
      sections.filter(s => s.height > 100).forEach(s => {
        if (s.isPlainWhite && s.height > 300) {
          console.log(`  ⚠ Section #${s.index + 1}: Plain white background, height=${s.height}px`);
        }
        if (!s.hasDecorations && !s.isPlainWhite && s.height > 400) {
          console.log(`  ? Section #${s.index + 1}: No decorations, height=${s.height}px, bg=${s.backgroundColor}`);
        }
      });
    }

    // 5. Take a screenshot for reference
    await page.screenshot({ 
      path: `/Users/ernesto/CodeProjects/Josa-AI_Rebrand copy/screenshots/${name.replace(/\//g, '_')}.png`,
      fullPage: false 
    });
    console.log(`  Screenshot saved: screenshots/${name.replace(/\//g, '_')}.png`);
  }

  // Compile overall issues
  console.log('\n=== Overall Visual Issues ===\n');
  
  // Check for alignment issues
  const alignmentIssues = await page.evaluate(() => {
    const issues = [];
    
    // Check if cards in grids have different heights
    document.querySelectorAll('.grid').forEach(grid => {
      const items = grid.querySelectorAll(':scope > *');
      const heights = [];
      
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.height > 0) heights.push(rect.height);
      });
      
      if (heights.length > 1) {
        const variance = Math.max(...heights) - Math.min(...heights);
        if (variance > 30) {
          issues.push({
            type: 'card_height_variance',
            variance: variance,
            count: items.length
          });
        }
      }
    });
    
    return issues;
  });
  
  if (alignmentIssues.length > 0) {
    results.overallIssues.push(...alignmentIssues);
    alignmentIssues.forEach(issue => {
      console.log(`  ⚠ Card alignment issue: ${issue.variance}px height variance across ${issue.count} items`);
    });
  }

  // Check for padding inconsistencies
  const paddingIssues = await page.evaluate(() => {
    const issues = [];
    
    // Check common sections for padding
    document.querySelectorAll('section').forEach(section => {
      const style = window.getComputedStyle(section);
      const py = parseFloat(style.paddingTop);
      const by = parseFloat(style.paddingBottom);
      
      if (py !== by) {
        issues.push({
          type: 'vertical_padding_mismatch',
          section: section.className.substring(0, 50),
          paddingTop: py,
          paddingBottom: by
        });
      }
    });
    
    return issues;
  });
  
  if (paddingIssues.length > 0) {
    console.log(`  ⚠ Padding inconsistencies found: ${paddingIssues.length}`);
  }

  await browser.close();
  
  // Save results to JSON
  const fs = require('fs');
  fs.writeFileSync('/Users/ernesto/CodeProjects/Josa-AI_Rebrand copy/visual-review-results.json', JSON.stringify(results, null, 2));
  
  console.log('\n=== Review Complete ===');
  console.log('Results saved to: visual-review-results.json');
  console.log('Screenshots saved to: screenshots/');
  
  return results;
}

runVisualReview().catch(console.error);
