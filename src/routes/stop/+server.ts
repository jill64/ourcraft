import { ec2 } from '$lib/server/ec2'
import { text } from '@sveltejs/kit'

export const POST = async () => {
  const res = await ec2.get_info()

  const state = res.Reservations?.[0]?.Instances?.[0]?.State?.Name

  if (state === 'stopped' || state === 'stopping') {
    return text('Server is already stopped')
  }

  await ec2.stop_instance()
  return text('')
}
