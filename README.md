
## Run Locally


1. **Install Dependencies**:
   in terminal:

   npm install

2. **Start the App**:
  to Run:
   npm run dev
   ```

3. **Open in Browser**:
   Visit `http://localhost:3000`

---

##  Architectural Choices

I chose these technologies and patterns to make the app fast, reliable, and easy to read:

### 1. Next.js (App Router)
I used the latest version of Next.js. It helps the page load quickly and handles all the routing between the checkout and success screens automatically.

### 2. Server-Side Rendering (SSR)
When we first open the checkout page, the "cart data" is fetched on the server before the page even reaches our browser. This makes the initial screen appear instantly and is great for performance.

### 3. Context API (State Management)
To keep track of our cart items and the address we type in, I used React Context. This acts like a "shared memory" for the app, so different parts (like the Shipping Form and the Order Summary) can talk to each other without passing data through every single component.

### 4. Tailwind CSS
For the design, I used Tailwind CSS. It allowed me to create a "premium" feel with smooth animations, custom shadows, and the brand-specific green color system while keeping the code simple and responsive for mobile phones.

