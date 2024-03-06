import { EC2_API_KEY } from '$env/static/private'
import { ec2 } from '$lib/server/ec2'
import { env } from 'node:process'

export const load = async ({ fetch }) => {
  const info = await ec2.get_info()
  const status = info.Reservations?.[0].Instances?.[0]
  const publicIP = status?.PublicIpAddress

  env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const output = publicIP
    ? fetch(`https://${publicIP}:8000`, {
        method: 'GET',
        headers: {
          'x-secret': EC2_API_KEY
        }
      }).then((res) => res.text())
    : ''

  return {
    status,
    publicIP,
    output
  }
}
