import { ec2 } from '$lib/server/ec2'
import { text } from '@sveltejs/kit'

export const POST = async () => {
  const res = await ec2.get_info()
  const state = res.Reservations?.[0]?.Instances?.[0]?.State?.Name

  if (state === 'running' || state === 'pending') {
    return text('Server is already running')
  }

  await ec2.start_instance()

  return text('')
}
