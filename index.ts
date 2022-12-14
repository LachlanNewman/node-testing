import { program,Option,InvalidArgumentError } from 'commander';
import dotenv from 'dotenv'
import { s3OffsetsWorkflow } from './s3OffsetsWorkflow';


function myParseInt(value:string) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

function main(){
  program
  .addOption(new Option('-n, --num-images <number>', 'number of images').makeOptionMandatory().argParser(myParseInt))
  .addOption(new Option('-s, --size <number>', 'The average number of bytes per image').makeOptionMandatory().argParser(myParseInt))
  .addOption(new Option('-b, --bucket <string>', 'specify bucket name').env('BUCKET').makeOptionMandatory())
  .addOption(new Option('-b, --key <string>', 'specify key name').env('KEY').makeOptionMandatory());
  
  program.parse()
  
  const {numImages,size,bucket,key} = program.opts<{numImages:number,size:number,bucket:string,key:string}>()
  
  try{
    s3OffsetsWorkflow(numImages,size,bucket,key)
  }
  catch(e){
    console.log(e)
  }
}

dotenv.config()
main()


