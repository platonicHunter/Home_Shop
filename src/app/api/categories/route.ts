import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Categories အားလုံး ဆွဲထုတ်ရန်
export async function GET() {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Category အသစ် ထည့်ရန်
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const { data, error } = await supabase.from('categories').insert([{ name }]).select();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Category ဖျက်ရန်
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}