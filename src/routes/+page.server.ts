import { EC2_API_KEY } from '$env/static/private'
import { ec2 } from '$lib/server/ec2'

export const load = async ({ fetch }) => {
  const info = await ec2.get_info()
  const status = info.Reservations?.[0].Instances?.[0]

  const output =
    status?.PublicDnsName && status.State?.Name === 'running'
      ? fetch(`https://${status.PublicDnsName}:8000`, {
          method: 'GET',
          headers: {
            'x-secret': EC2_API_KEY
          }
        }).then((res) => res.text())
      : ''

  return {
    status,
    publicIP: status?.PublicIpAddress,
    output
  }
}
