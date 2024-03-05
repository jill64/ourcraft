import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  EC2_INSTANCE_ID
} from '$env/static/private'
import {
  DescribeInstancesCommand,
  EC2Client,
  GetConsoleOutputCommand,
  StartInstancesCommand,
  StopInstancesCommand
} from '@aws-sdk/client-ec2' // ES Modules import

const client = new EC2Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

export const ec2 = {
  async get_info() {
    const response = await client.send(
      new DescribeInstancesCommand({
        InstanceIds: [EC2_INSTANCE_ID]
      })
    )
    return response
  },
  async get_console_output() {
    const response = await client.send(
      new GetConsoleOutputCommand({
        InstanceId: EC2_INSTANCE_ID
      })
    )
    return response
  },
  async start_instance() {
    const response = await client.send(
      new StartInstancesCommand({
        InstanceIds: [EC2_INSTANCE_ID]
      })
    )
    return response
  },
  async stop_instance() {
    const response = await client.send(
      new StopInstancesCommand({
        InstanceIds: [EC2_INSTANCE_ID]
      })
    )
    return response
  }
}
