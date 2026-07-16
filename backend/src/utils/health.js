export function getHealthPayload() {
  return {
    status: 'ok',
    uptime: process.uptime(),
  };
}
