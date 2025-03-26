import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    const response = await fetch(
      `https://modelslab.com/api/subscribed_products?key=${key}`
    );

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
