export const schema = {
  types: [
    {
      name: "book",
      title: "Books",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Book Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
            slugify: (input) => {
              return (
                input
                  .toLowerCase()
                  .replace(/[\u0900-\u097F]/g, "") // Hindi characters हटाएगा
                  .replace(/[^\w\s-]/g, "") // Special characters हटाएगा
                  .trim()
                  .replace(/\s+/g, "-") // Spaces को dash बनाएगा
                  .replace(/\-\-+/g, "-")
                  .replace(/^-+/, "")
                  .replace(/-+$/, "") || `book-${Date.now()}`
              );
            },
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "author",
          title: "Author",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "price",
          title: "Price",
          type: "number",
        },
        {
          name: "coverImage",
          title: "Cover Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        },
        {
          name: "category",
          title: "Category",
          type: "string",
          options: {
            list: [
              { title: "उपन्यास", value: "upanyas" },
              { title: "कहानी संग्रह", value: "kahani-sangrah" },
              { title: "कविता संग्रह", value: "kavita-sangrah" },
              { title: "नाटक", value: "natak" },
              {
                title: "जीवनी/आत्मकथा/संस्मरण",
                value: "jeevani-atmakatha-sansmaran",
              },
              { title: "इतिहास", value: "itihas" },
              { title: "राजनीति/समाजशास्त्र", value: "rajniti-samajshastra" },
              {
                title: "आलोचना/साहित्य समीक्षा",
                value: "alochana-sahitya-samiksha",
              },
              { title: "निबंध संग्रह", value: "nibandh-sangrah" },
              { title: "बाल साहित्य", value: "bal-sahitya" },
              { title: "धार्मिक/अध्यात्म", value: "dharmik-adhyatma" },
              { title: "यात्रा वृत्तांत", value: "yatra-vrittant" },
            ],
          },
        },
      ],
    },

    // Order Schema
    {
      name: "order",
      title: "Orders",
      type: "document",
      fields: [
        {
          name: "orderNumber",
          title: "Order Number",
          type: "string",
          readOnly: true,
        },
        {
          name: "customerName",
          title: "Customer Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "customerEmail",
          title: "Customer Email",
          type: "string",
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: "customerPhone",
          title: "Customer Phone",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "shippingAddress",
          title: "Shipping Address",
          type: "object",
          fields: [
            { name: "street", title: "Street Address", type: "string" },
            { name: "city", title: "City", type: "string" },
            { name: "state", title: "State", type: "string" },
            { name: "pincode", title: "Pincode", type: "string" },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "items",
          title: "Order Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "book",
                  title: "Book",
                  type: "reference",
                  to: [{ type: "book" }],
                },
                {
                  name: "quantity",
                  title: "Quantity",
                  type: "number",
                  validation: (Rule) => Rule.min(1),
                },
                {
                  name: "price",
                  title: "Price per Item",
                  type: "number",
                },
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: "totalAmount",
          title: "Total Amount",
          type: "number",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "paymentStatus",
          title: "Payment Status",
          type: "string",
          options: {
            list: [
              { title: "Pending", value: "pending" },
              { title: "Paid", value: "paid" },
              { title: "Failed", value: "failed" },
              { title: "Refunded", value: "refunded" },
            ],
          },
          initialValue: "pending",
        },
        {
          name: "orderStatus",
          title: "Order Status",
          type: "string",
          options: {
            list: [
              { title: "Processing", value: "processing" },
              { title: "Shipped", value: "shipped" },
              { title: "Delivered", value: "delivered" },
              { title: "Cancelled", value: "cancelled" },
            ],
          },
          initialValue: "processing",
        },
        {
          name: "paymentId",
          title: "Payment ID",
          type: "string",
        },
        {
          name: "orderDate",
          title: "Order Date",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
        },
        {
          name: "notes",
          title: "Admin Notes",
          type: "text",
        },
      ],
      preview: {
        select: {
          title: "orderNumber",
          subtitle: "customerName",
          media: "paymentStatus",
        },
        prepare({ title, subtitle, media }) {
          return {
            title: title || "New Order",
            subtitle: `${subtitle} - ${media}`,
          };
        },
      },
    },
  ],
};
