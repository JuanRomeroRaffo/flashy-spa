import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.phone || !body.email || !body.interest) {
    return new Response(JSON.stringify({ error: 'Campos incompletos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const directusUrl = import.meta.env.PUBLIC_DIRECTUS_URL;
  const directusToken = import.meta.env.DIRECTUS_TOKEN;

  const res = await fetch(`${directusUrl}/items/page_contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${directusToken}`,
    },
    body: JSON.stringify({
      name: body.name,
      phone: body.phone,
      email: body.email,
      interest: body.interest,
      ...(body.cupon ? { cupon: body.cupon } : {}),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Directus error:', errorText);
    return new Response(JSON.stringify({ error: 'Error al guardar el contacto.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'Registro exitoso' }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
