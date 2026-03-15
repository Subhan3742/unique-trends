import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, shippingAddress, items, totalAmount, notes } = body;

    const orderNumber = `UT-${Date.now()}`;

    const order = await writeClient.create({
      _type: "order",
      orderNumber,
      status: "pending",
      customer,
      shippingAddress,
      items: items.map((item: any, index: number) => ({
        _key: `item-${index}-${Date.now()}`,
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "",
        ...(item.productId && {
          product: { _type: "reference", _ref: item.productId, _weak: true }
        }),
      })),
      totalAmount,
      notes: notes || "",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, orderId: order._id, orderNumber });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}
