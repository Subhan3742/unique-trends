import { defineType, defineField } from "sanity";

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
          fields: [
            { name: "productId", title: "Product ID", type: "string" },
            { name: "title", title: "Product Title", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "image", title: "Image URL", type: "string" },
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
      return { title: `Order #${title}`, subtitle: `${subtitle} — ${status}` };
    },
  },
});
