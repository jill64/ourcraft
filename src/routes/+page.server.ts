import { ec2 } from '$lib/server/ec2'

export const load = async () => {
  const [info, { Output }] = await Promise.all([
    ec2.get_info(),
    ec2.get_console_output()
  ])

  return {
    status: info.Reservations?.[0].Instances?.[0],
    output: Output
  }
}
