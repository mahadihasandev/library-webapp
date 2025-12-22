import {Client as WorkFlowClient} from "@upstash/workflow"
import { Client as QStashClient, resend } from "@upstash/qstash";

import config from "./config"

export const workflowClient=new WorkFlowClient({
    baseUrl:config.env.upstash.qstashUrl,
    token:config.env.upstash.qstashToken,
})


const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });


export const sendEmile =async({email,subject,message}:{email:string;subject:string;message:string})=>{
  await qstashClient.publishJSON({
  api: {
    name: "email",
    provider: resend({ token:config.env.upstash.resendToken}),
  },
  body: {
    from: "Mahadi <hello.mahadihasanarnob.shop>",
    to: [email],
    subject,
    html:message,
  },
});

}
