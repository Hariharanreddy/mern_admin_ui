# 🎁 GiftHub — Design System & UI Standards

> **Version**: 1.0  
> **Platform**: Admin Dashboard (Vite + React + Ant Design)  
> **Last Updated**: May 2026

Use this document as the single source of truth for all visual decisions across every dashboard in the GiftHub platform (Admin UI, Client UI, internal tools).

---

## 1. Color Palette

### Primary & Accent

| Token             | Value       | Usage                                     |
|-------------------|-------------|-------------------------------------------|
| `colorPrimary`    | `#7C3AED`   | Buttons, links, active states, focus rings |
| `colorPrimaryHover` | `#6D28D9` | Button hover, link hover                  |
| `colorPrimaryLight` | `#EDE9FE` | Badges, avatar backgrounds, subtle fills  |
| `colorPrimaryMuted` | `rgba(124,58,237,0.08)` | Sidebar accents, row hovers  |

### Semantic Colors

| Token            | Value       | Usage                             |
|------------------|-------------|-----------------------------------|
| `colorSuccess`   | `#10B981`   | Success states, delivered tags    |
| `colorWarning`   | `#F59E0B`   | Pending states, low-stock alerts  |
| `colorDanger`    | `#EF4444`   | Errors, destructive actions       |
| `colorInfo`      | `#3B82F6`   | Informational badges, tips        |

### Neutrals

| Token              | Value       | Usage                           |
|--------------------|-------------|---------------------------------|
| `textPrimary`      | `#1F1F1F`   | Headings, body text (light mode)|
| `textSecondary`    | `#6B7280`   | Subtitles, descriptions, labels |
| `textMuted`        | `#9CA3AF`   | Placeholders, disabled text     |
| `bgSurface`        | `#FFFFFF`   | Cards, modals, drawers          |
| `bgPage`           | `#F9FAFB`   | Page backgrounds (light mode)   |
| `borderLight`      | `#F3F4F6`   | Card borders, dividers          |

### Gradients

| Name             | Value                                                      | Usage                        |
|------------------|-------------------------------------------------------------|------------------------------|
| `gradientLogin`  | `linear-gradient(135deg, #667eea 0%, #7C3AED 50%, #a855f7 100%)` | Login page background  |
| `gradientSidebar`| `linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 100%)` | Sidebar header area |

---

## 2. Typography

### Font Stack

```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Scale

| Element           | Size   | Weight | Usage                            |
|-------------------|--------|--------|----------------------------------|
| Page Title        | 20px   | 600    | `Typography.Title level={4}`     |
| Card Title        | 14px   | 600    | Card `title` prop                |
| Body Text         | 14px   | 400    | Default `Typography.Text`        |
| Secondary Text    | 13px   | 400    | `Typography.Text type="secondary"` |
| Table Header      | 12px   | 600    | Uppercase, letter-spacing: 0.5px |
| Button Text       | 14px   | 500    | Ant Design default               |
| Small/Caption     | 12px   | 400    | Footnotes, timestamps            |

---

## 3. Spacing & Layout

### Grid System
- **Gutter**: 16px (standard), 24px (wide sections)
- **Content margin**: 24px around `<Content />`
- **Card internal padding**: Ant Design default (24px)

### Responsive Breakpoints
```tsx
// Always use responsive Col props
<Col xs={24} sm={12} md={8} lg={6} xl={6}>

// Minimum breakpoints for key layouts:
// xs: < 576px  → single column
// sm: ≥ 576px  → 2-column forms
// lg: ≥ 992px  → full dashboard grid
```

### Border Radius
- **Cards & modals**: 8px (`borderRadius` token)
- **Buttons**: 8px (inherits from token)
- **Tags**: 6px
- **Avatars**: 50% (circle)
- **Login card**: 16px (special)

---

## 4. Component Patterns

### Stat Cards (HomePage)
```tsx
<Card bordered={false} style={{ borderTop: '3px solid #7C3AED' }}>
    <Statistic
        title="Title"
        value={123}
        prefix={<SomeIcon style={{ color: '#7C3AED' }} />}
        suffix={<Text type="success" style={{ fontSize: 13 }}>↑ 12%</Text>}
    />
</Card>
```

### Page Header Pattern
Every data page should have:
```tsx
<Breadcrumb ... />
<Flex justify="space-between" align="center" style={{ marginTop: 8 }}>
    <div>
        <Typography.Title level={4} style={{ margin: 0 }}>Page Name</Typography.Title>
        <Typography.Text type="secondary">Short description of this page</Typography.Text>
    </div>
</Flex>
```

### Form Card Sections
Always use an icon prefix in card titles:
```tsx
<Card title={<Space><InfoCircleOutlined /> Section Title</Space>} bordered={false}>
```

### Table Empty States
```tsx
locale={{
    emptyText: (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
                <Space direction="vertical" size={4}>
                    <Typography.Text>No items found</Typography.Text>
                    <Typography.Text type="secondary">Description text</Typography.Text>
                </Space>
            }
        />
    ),
}}
```

### Order Status Stepper
Use `<Steps>` for order progress visualization:
```tsx
const steps = ['Received', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
<Steps current={currentStepIndex} size="small" items={steps.map(s => ({ title: s }))} />
```

### Login Page
- Full-screen gradient background (`gradientLogin`)
- Glassmorphism card: `backdrop-filter: blur(10px)`, `background: rgba(255,255,255,0.92)`
- Card width: 380px, border-radius: 16px
- Card shadow: `0 8px 32px rgba(124, 58, 237, 0.18)`

---

## 5. Iconography

| Context         | Icon                   | Source           |
|-----------------|------------------------|------------------|
| Products menu   | Gift-box SVG           | Custom (FoodIcon)|
| Orders menu     | Shopping bag SVG       | Custom (BasketIcon)|
| Stores menu     | Storefront SVG         | Custom (StoreIcon)|
| Promos menu     | Gift ribbon SVG        | Custom (GiftIcon)|
| Users menu      | Person SVG             | Custom (UserIcon)|
| Form: Product   | `InfoCircleOutlined`   | @ant-design/icons|
| Form: Image     | `PictureOutlined`      | @ant-design/icons|
| Form: Store     | `ShopOutlined`         | @ant-design/icons|
| Form: Security  | `SafetyOutlined`       | @ant-design/icons|
| Form: Settings  | `SettingOutlined`      | @ant-design/icons|
| Form: Role      | `TeamOutlined`         | @ant-design/icons|

---

## 6. Order Status Tag Colors

| Status            | Ant Design Color | Visual       |
|-------------------|------------------|--------------|
| `received`        | `geekblue`       | Blue accent  |
| `confirmed`       | `cyan`           | Teal accent  |
| `prepared`        | `purple`         | Purple accent|
| `out_for_delivery` | `magenta`       | Pink accent  |
| `delivered`       | `success`        | Green accent |

---

## 7. Animations & Transitions

### Page Transitions
```css
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
}
.page-enter { animation: fadeInUp 0.25s ease-out; }
```

### Component Transitions
```css
.ant-menu-item, .ant-btn, .ant-card, .ant-tag {
    transition: all 0.2s ease-in-out !important;
}
```

### Scrollbar
```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(124,58,237,0.45); }
```

---

## 8. Table Styling

```css
/* Alternating row tint */
.ant-table-tbody > tr:nth-child(even) > td {
    background: rgba(124, 58, 237, 0.02);
}

/* Hover row tint */
.ant-table-tbody > tr:hover > td {
    background: rgba(124, 58, 237, 0.06) !important;
}

/* Uppercase headers */
.ant-table-thead > th {
    font-weight: 600 !important;
    text-transform: uppercase;
    font-size: 12px !important;
    letter-spacing: 0.5px;
}
```

---

## 9. Avatar & Profile

- **Background**: `#EDE9FE`
- **Text color**: `#7C3AED`
- **Content**: User's initials (`firstName[0] + lastName[0]`)
- **Dropdown**: Show user name + email header, divider, then logout (danger color)

---

## 10. Dark Mode

- Uses Ant Design's `theme.darkAlgorithm`
- `colorPrimary` remains `#7C3AED` (works in both modes)
- Sidebar switches between `theme="light"` and `theme="dark"`
- Logo text fill swaps: light → `#1F1F1F`, dark → `#FFFFFF`
- Login gradient background stays consistent in both modes

---

## 11. Ant Design ConfigProvider Token

```tsx
<ConfigProvider
    theme={{
        token: {
            colorPrimary: '#7C3AED',
            colorLink: '#7C3AED',
            colorSuccess: '#10B981',
            borderRadius: 8,
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}>
```

---

## 12. Naming Conventions

| Concept       | Term Used   | NOT Used             |
|---------------|-------------|----------------------|
| Vendor/Branch | **Store**   | Restaurant, Tenant   |
| Catalog items | **Product** | Food, Item           |
| Extras        | **Add-on**  | Topping              |
| Purchase      | **Order**   | -                    |
| Discount      | **Promo**   | Coupon, Deal         |
| Currency      | **₹** (INR) | -                    |
