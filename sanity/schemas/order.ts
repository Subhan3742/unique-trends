import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({ name: "orderNumber", title: "Order Number", type: "string", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["pending", "confirmed", "shipped", "delivered", "cancelled"], layout: "radio" },
      initialValue: "pending",
    }),
    defineField({
      name: "customer",
      title: "Customer Info",
      type: "object",
      fields: [
        { name: "name", title: "Full Name", type: "string" },
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
      ],
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        { name: "address", title: "Street Address", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "province", title: "Province", type: "string" },
        { name: "postalCode", title: "Postal Code", type: "string" },
      ],
    }),
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: {
              title: "title",
              quantity: "quantity",
              price: "price",
              media: "product.images.0.asset",
            },
            prepare({ title, quantity, price, media }: any) {
              return {
                title: title || "Unknown Product",
                subtitle: `Qty: ${quantity || 1}  |  PKR ${(price || 0).toLocaleString()}`,
                media: media || ImageIcon,
              };
            },
          },
          fields: [
            { name: "productId", title: "Product ID", type: "string" },
            { name: "title", title: "Product Name", type: "string" },
            { name: "price", title: "Price (PKR)", type: "number" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "image", title: "Image URL", type: "url" },
            {
              name: "product",
              title: "Product Reference",
              type: "reference",
              to: [{ type: "product" }],
              weak: true,
            },
          ],
        },
      ],
    }),
    defineField({ name: "totalAmount", title: "Total Amount (PKR)", type: "number" }),
    defineField({ name: "notes", title: "Order Notes", type: "text" }),
    defineField({ name: "createdAt", title: "Order Date", type: "datetime", readOnly: true }),
  ],
  preview: {
    select: { title: "orderNumber", subtitle: "customer.name", status: "status" },
    prepare({ title, subtitle, status }: any) {
      const emoji = status === "pending" ? "🕐" : status === "confirmed" ? "✅" : status === "shipped" ? "🚚" : status === "delivered" ? "📦" : "❌";
      return { title: `${emoji} Order #${title}`, subtitle: `${subtitle} — ${status}` };
    },
  },
});
