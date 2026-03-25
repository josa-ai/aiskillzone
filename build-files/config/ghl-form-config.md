# GoHighLevel Contact Form Integration

## Form Fields

| Field | Type | Required | GHL Field Map |
|-------|------|----------|---------------|
| Full Name | text | Yes | contact.name |
| Email | email | Yes | contact.email |
| Phone | tel | Yes | contact.phone |
| Service Interest | select | Yes | contact.customField.service_interest |
| Message | textarea | No | contact.customField.message |
| UTM Source | hidden | No | contact.customField.utm_source |
| UTM Medium | hidden | No | contact.customField.utm_medium |
| UTM Campaign | hidden | No | contact.customField.utm_campaign |
| Page URL | hidden | No | contact.customField.source_url |

## Service Interest Dropdown Options

- Website Design & Redesign
- Voice AI & Chatbot Setup
- AI Automation & Workflows
- AI Training & Workshops
- E-Commerce Consulting
- Brand Strategy & Marketing
- Digital Product Creation
- Custom App Development
- Business Tools (CRM, Reviews, Courses)
- Not sure — I need guidance

## Integration Method

POST to GHL webhook URL stored in environment variable:
```
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/REPLACE_WITH_YOUR_WEBHOOK_ID
```

### Request Format
```javascript
const formData = {
  name: fullName,
  email: email,
  phone: phone,
  customField: {
    service_interest: selectedService,
    message: message,
    utm_source: searchParams.get('utm_source') || 'direct',
    utm_medium: searchParams.get('utm_medium') || 'none',
    utm_campaign: searchParams.get('utm_campaign') || 'none',
    source_url: window.location.href,
  },
};

await fetch(process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## Form Placement

1. **Contact page** (/contact) — Full form with all fields
2. **Footer** — Compact form (Name, Email, Service Interest only)
3. **Service pages** — Inline CTA that links to /contact with service pre-selected via query param (e.g., /contact?service=voice-ai)

## Success/Error States

**Success message:** "Thanks for reaching out. We'll get back to you within one business day."
**Error message:** "Something went wrong on our end. Please try again, or email us directly at ernesto@josato.net."

## UTM Tracking

Auto-capture UTM parameters from URL and pass them as hidden fields. This allows tracking which campaigns drive form submissions in GHL.
