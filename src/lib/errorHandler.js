export function handleError(res, message = 'Internal server error', status = 500) {
  return new Response(JSON.stringify({ message }), { status });
}
