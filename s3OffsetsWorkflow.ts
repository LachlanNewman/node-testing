import { S3 } from "aws-sdk"
import { randomBytes } from "crypto"

export async function s3OffsetsWorkflow(numImages:number,size:number,Bucket:string,Key:string){
    const s3 = new S3()
    const offsetList:string[] = []

    for(let i = 1; i<=numImages;i++){
        offsetList.push((size*i).toString(16))
    }
    
    await s3.createBucket({Bucket}).promise()
    await s3.deleteObject({Bucket,Key}).promise()    
        
    const offsets = offsetList.join()

    await s3.upload({
    Bucket,
    Key,
    Metadata: {offsets},
    Body: randomBytes(size)
    }).promise()

    const head = await s3.headObject({Bucket,Key}).promise()
    if(head.Metadata?.offsets !== offsets) throw new Error('Offsets in header not matching')
  }