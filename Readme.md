# Instructions
## Prerequisites
1. Create a bucket is s3 
2. Create `.env file` with values

## Running
`yarn tsnd -n <Number of Images> -s <Average Size in bytes for each image>`

# Findings
The Below are a list of finding testing the possible size of user defined metadata to s3 by increasing the number of images and the average size of each image gradually.

The offsets for each image are **first coverted to hex and then cocatenated into a comma seperated string**.

It looks like we start to reach the **limit once more than 300 images are present**. increasing the average size of each image has less affect.

| **Number of Images** | **Average Bytes Per Image** | **Number Bytes in Metadata Offsets (Hex)** | **Successfully Posted to S3**| 
| - | - | - | - |
| 50| 50000 | 328 | true |
| 50| 100000 | 339 | true |
| 50| 150000 | 343 | true |
| 50| 200000 | 344 | true |
| 50| 250000 | 345 | true |
| 100| 50000 | 678 | true |
| 100| 100000 | 689 | true |
| 100| 150000 | 693 | true |
| 100| 200000 | 711 | true |
| 100| 250000 | 728 | true |
| 150| 50000 | 1028 | true |
| 150| 100000 | 1039 | true |
| 150| 150000 | 1082 | true |
| 150| 200000 | 1111 | true |
| 150| 250000 | 1128 | true |
| 200| 50000 | 1378 | true |
| 200| 100000 | 1422 | true |
| 200| 150000 | 1482 | true |
| 200| 200000 | 1511 | true |
| 200| 250000 | 1528 | true |
| 250| 50000 | 1728 | true |
| 250| 100000 | 1822 | true |
| 250| 150000 | 1882 | true |
| 250| 200000 | 1911 | true |
| 250| 250000 | 1928 | true |
| 300| 50000 | 2078 | false |
| 300| 100000 | 2222 | false |
| 300| 150000 | 2282 | false |
| 300| 200000 | 2311 | false |
| 300| 250000 | 2328 | false |
| 350| 50000 | 2443 | false |
| 350| 100000 | 2622 | false |
| 350| 150000 | 2682 | false |
| 350| 200000 | 2711 | false |
| 350| 250000 | 2728 | false |
| 400| 50000 | 2843 | false |
| 400| 100000 | 3022 | false |
| 400| 150000 | 3082 | false |
| 400| 200000 | 3111 | false |
| 400| 250000 | 3128 | false |