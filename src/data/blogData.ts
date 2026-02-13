import { BlogPost } from "../types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Minimalist Web Design",
    excerpt:
      "Discover how simplicity and intentional design choices can create powerful user experiences that stand the test of time.",
    content: `# The Art of Minimalist Web Design

Minimalism in web design isn't just about making things look pretty—it's about creating intentional, purposeful experiences that put users first.

![Minimalist Design Concept](/minimalist-preview.jpg)

## Why Minimalism Matters

In a world overflowing with information and visual noise, minimalist design offers a breath of fresh air. By stripping away unnecessary elements, we can:

- **Improve User Focus**: Less clutter means users can focus on what truly matters
- **Enhance Performance**: Fewer elements lead to faster load times
- **Create Timeless Design**: Simple designs age better than trendy, cluttered ones

## Key Principles

### 1. White Space is Your Friend

Don't be afraid of empty space. It gives your content room to breathe and helps establish visual hierarchy.

// filename: typography.css
\`\`\`css
h1 {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
\`\`\`

### 3. Purposeful Color Choices

A limited color palette doesn't mean boring. It means every color has a purpose and creates impact.

## Implementing Minimalism

Start by asking: "Does this element serve a purpose?" If not, remove it. Every element on your page should either:

- Provide information
- Enable an action
- Create visual hierarchy

Remember: Minimalism is about being intentional, not empty. It's about making every element count.`,
    date: "2024-02-10",
    readTime: 5,
    author: "Alex Morgan",
    coverImage: "/minimalist-preview.jpg",
  },
  {
    id: "2",
    title: "Building Scalable React Applications",
    excerpt:
      "Learn practical strategies for structuring React applications that can grow from small projects to enterprise-level solutions.",
    content: `# Building Scalable React Applications

As your React application grows, maintaining clean architecture becomes crucial. Here's how to build applications that scale gracefully.

## Project Structure Matters

A well-organized project structure is the foundation of scalability. Here's a proven approach:

// filename: project-structure.txt
\`\`\`
src/
  components/     # Reusable UI components
  features/       # Feature-based modules
  hooks/          # Custom React hooks
  services/       # API and business logic
  utils/          # Helper functions
  types/          # TypeScript definitions
\`\`\`

## Component Design Principles

### Keep Components Focused

Each component should have a single responsibility. If a component is doing too much, break it down.

// filename: SimpleComponent.tsx
\`\`\`tsx
import React from 'react';

export const SimpleComponent = ({ title }) => {
  return <h2 className="text-xl font-bold">{title}</h2>;
};
\`\`\`

### Composition Over Inheritance

React's component model favors composition. Build complex UIs by combining simple components rather than creating deep inheritance hierarchies.

## State Management

Don't reach for Redux immediately. Consider this progression:

1. **Local State**: Start with useState for component-specific state
2. **Context API**: For sharing state across multiple components
3. **State Management Library**: Only when complexity demands it

## Conclusion

Scalability isn't achieved overnight. It's the result of consistent, thoughtful decisions throughout your application's lifecycle.`,
    date: "2024-02-05",
    readTime: 8,
    author: "Alex Morgan",
    coverImage: "/react-preview.jpg",
  },
  {
    id: "3",
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging trends and technologies that are shaping the next generation of web experiences.",
    content: `# The Future of Web Development

The web development landscape is constantly evolving. Let's explore the trends and technologies that are shaping our future.

![Future Tech Concept](/future-preview.jpg)

## The Rise of Web Assembly

WebAssembly (WASM) is enabling near-native performance in web applications. This opens doors for complex computational tasks in the browser.

// filename: fibonacci.rs
\`\`\`rust
fn fibonacci(n: u32) -> u32 {
    if n <= 1 { return n; }
    fibonacci(n - 1) + fibonacci(n - 2)
}
\`\`\`

## AI-Powered Development

AI is transforming how we build applications:

### Code Generation

Tools like GitHub Copilot and ChatGPT are accelerating development by helping with boilerplate and bug detection.

## Edge Computing

Moving computation closer to users through edge networks reduces latency and improves performance globally.

## Conclusion

The future of web development is exciting and full of possibilities. By staying curious and focusing on fundamentals, we can navigate these changes successfully.`,
    date: "2024-01-28",
    readTime: 6,
    author: "Alex Morgan",
    coverImage: "/future-preview.jpg",
  },
  {
    id: "4",
    title: "Mastering CSS Grid and Flexbox",
    excerpt:
      "A comprehensive guide to modern CSS layout techniques that will transform how you build responsive interfaces.",
    content: `# Mastering CSS Grid and Flexbox

Modern CSS provides powerful layout tools. Let's master Grid and Flexbox to build any layout imaginable.

## Flexbox: One-Dimensional Layouts

Use Flexbox when laying out items in a single direction (row or column):

// filename: flex-layout.css
\`\`\`css
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

Use Grid for complex, two-dimensional layouts like page structures.

// filename: grid-layout.css
\`\`\`css
.page-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
\`\`\`

## Conclusion

Grid and Flexbox have revolutionized CSS layouts. Together, they provide all the tools needed to build any layout without hacks.`,
    date: "2024-01-15",
    readTime: 7,
    author: "Alex Morgan",
    coverImage: "/css-preview.jpg",
  },
  {
    id: "5",
    title: "Crafting Delightful User Experiences",
    excerpt:
      "Learn the principles and practices that separate good interfaces from great ones through thoughtful UX design.",
    content: `# Crafting Delightful User Experiences

Great user experience isn't accidental—it's the result of thoughtful design, empathy, and attention to detail.

![UX Design Process](/ux-preview.jpg)

## The Five Principles of UX

1. **Useful**: Does it serve a purpose?
2. **Usable**: Can users accomplish their goals efficiently?
3. **Desirable**: Do users want to use it?
4. **Findable**: Can users find what they need?
5. **Accessible**: Can everyone use it?

## Microinteractions Matter

Small details create delight:
- Smooth transitions
- Hover effects
- Feedback animations

## Conclusion

Delightful user experiences come from empathy and continuous iteration. Always prioritize the user.`,
    date: "2024-01-02",
    readTime: 9,
    author: "Alex Morgan",
    coverImage: "/ux-preview.jpg",
  },
];
