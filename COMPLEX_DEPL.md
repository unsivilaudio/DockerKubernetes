# AWS Configuration Cheat Sheet - Updated for new UI

**_updated 8-19-2021_**

> This lecture note is not intended to be a replacement for the videos, but to serve as a cheat sheet for students who want to quickly run thru the AWS configuration steps or easily see if they missed a step. It will also help navigate through the changes to the AWS UI since the course was recorded.

### EBS Application Creation (If using Multi-Container Docker Platform)

-   Go to _AWS Management Console_ and use _Find Services_ to search for _"Elastic Beanstalk"_

-   Click _Create Application_

-   Set `Application Name` to _multi-docker_

-   Scroll down to `Platform` and select _Docker_

-   In `Platform Branch`, select _Multi-Container Docker_ running on 64bit Amazon Linux

-   Click _Create Application_

> You may need to refresh, but eventually, you should see a green checkmark underneath Health.

### EBS Application Creation (If using Amazon Linux 2 Platform Platform)

> **Make sure you have followed the guidance in this note.**

-   Go to _AWS Management Console_ and use _Find Services_ to search for _"Elastic Beanstalk"_

-   Click _Create Application_

-   Set `Application Name` to _multi-docker_

-   Scroll down to `Platform` and select _Docker_

-   The `Platform Branch` should be automatically set to Docker Running on 64bit Amazon Linux 2.

-   Click _Create Application_

> You may need to refresh, but eventually, you should see a green checkmark underneath Health.

### RDS Database Creation

-   Go to _AWS Management Console_ and use _Find Services_ to search for _"RDS"_

-   Click _Create_ database button

-   Select _PostgreSQL_

-   Change `Version` to the newest available v12 version (The free tier is currently not available for Postgres v13)

-   In `Templates`, check the Free tier box.

-   Scroll down to _Settings_.

-   Set `DB Instance` identifier to _multi-docker-postgres_

-   Set `Master Username` to _postgres_

-   Set `Master Password` to _postgrespassword_ and confirm.

-   Scroll down to _Connectivity_. Make sure `VPC` is set to _Default VPC_

-   Scroll down to _Additional Configuration_ and click to _unhide_.

-   Set `Initial database name` to _fibvalues_

-   Scroll down and click _Create Database_ button

### ElastiCache Redis Creation

-   Go to _AWS Management Console_ and use _Find Services_ to search for _"ElastiCache"_

-   Click _Redis_ in sidebar

-   Click the _Create_ button

-   Make sure `Cluster Mode Enabled` is **NOT** ticked

-   In _Redis Settings_ form, set `Name` to _multi-docker-redis_

-   Change `Node type` to _'cache.t2.micro'_

-   Change `Replicas` per Shard to _0_

-   Scroll down and click _Create_ button

### Creating a Custom Security Group

-   Go to _AWS Management Console_ and use _Find Services_ to search for _"VPC"_

-   Find the _Security_ section in the left sidebar and click _Security Groups_

-   Click _Create Security Group_ button

-   Set `Security group name` to _multi-docker_

-   Set `Description` to _multi-docker_

-   Make sure VPC is set to default VPC

-   Scroll down and click the _Create Security Group_ button.

-   After the security group has been created, find the _Edit inbound rules_ button.

-   Click _Add Rule_

-   Set `Port` Range to **5432-6379**

-   Click in the box next to _Source_ and start typing 'sg' into the box. Select the _Security Group_ you just created.

-   Click the _Save rules_ button

### Applying Security Groups to ElastiCache

-   Go to _AWS Management Console_ and use _Find Services_ to search for ElastiCache

-   Click _Redis_ in Sidebar

-   Check the box next to _Redis cluster_

-   Click _Actions_ and click _Modify_

-   Click the pencil icon to edit the _VPC Security_ group. Tick the box next to the new _"multi-docker"_ group and click _Save_

-   Click _Modify_

### Applying Security Groups to RDS

-   Go to _AWS Management Console_ and use _Find Services_ to search for _"RDS"_

-   Click _Databases_ in Sidebar and check the box next to your instance

-   Click _Modify_ button

-   Scroll down to _Connectivity_ and add the new multi-docker security group

-   Scroll down and click the _Continue_ button

-   Click _Modify DB_ instance button

### Applying Security Groups to Elastic Beanstalk

-   Go to AWS Management Console and use Find Services to search for _"Elastic Beanstalk"_

-   Click _Environments_ in the left sidebar.

-   Click _MultiDocker-env_

-   Click _Configuration_

-   In the _Instances_ row, click the _Edit_ button.

-   Scroll down to _EC2 Security Groups_ and tick box next to _"multi-docker"_

-   Click Apply and Click Confirm

-   After all the instances restart and go from No Data to Severe, you should see a green checkmark under Health.

### Add AWS configuration details to .travis.yml file's deploy script

-   Set the `region`. The `region` code can be found by clicking the region in the toolbar next to your username.

    > e.g. _'us-east-1'_

-   `app` should be set to the EBS Application Name

    > e.g. _'multi-docker'_

-   `env` should be set to your EBS Environment name.

    > e.g. _'MultiDocker-env'_

-   Set the `bucket_name`. This can be found by searching for the S3 Storage service. Click the link for the elasticbeanstalk bucket that matches your region code and copy the name.

    > e.g. _'elasticbeanstalk-us-east-1-923445599289'_

-   Set the `bucket_path` to _'docker-multi'_

-   Set `access_key_id` to $AWS_ACCESS_KEY

-   Set `secret_access_key` to $AWS_SECRET_KEY

### Setting Environment Variables

1. Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

    - Click Environments in the left sidebar.

    - Click MultiDocker-env

    - Click Configuration

    - In the Software row, click the Edit button

    - Scroll down to Environment properties

1. **In another tab**, Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379

    - Set REDIS_HOST key to the primary endpoint listed above, **remember to omit :6379**

    - Set REDIS_PORT to 6379

    - Set PGUSER to postgres

    - Set PGPASSWORD to postgrespassword

1. **In another tab**, open up the RDS dashboard, click databases in the sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.

    - Set the PGHOST key to the endpoint value listed above.

    - Set PGDATABASE to fibvalues

    - Set PGPORT to 5432

    - Click Apply button

1. **_After all instances restart_** and go from No Data, to Severe, you should see a green checkmark under Health.

### IAM Keys for Deployment

> You can use the same IAM User's access and secret keys from the single container app we created earlier, or, you can create a new IAM user for this application:

1.  Search for the _"IAM Security, Identity & Compliance Service"_

1.  Click _"Create Individual IAM Users"_ and click _"Manage Users"_

1.  Click _"Add User"_

1.  Enter any name you’d like in the _"User Name"_ field.

        e.g. docker-multi-travis-ci

1.  Tick the _"Programmatic Access"_ checkbox

1.  Click _"Next:Permissions"_

1.  Click _"Attach Existing Policies Directly"_

1.  Search for _"beanstalk"_

1.  Tick the box next to _"AdministratorAccess-AWSElasticBeanstalk"_

1.  Click _"Next:Tags"_

1.  Click _"Next:Review"_

1.  Click _"Create user"_

1.  Copy and / or download the Access Key ID and Secret Access Key to use in the Travis Variable Setup.

### AWS Keys in Travis

-   Go to your Travis Dashboard and find the project repository for the application we are working on.

-   On the repository page, click "More Options" and then "Settings"

-   Create an AWS_ACCESS_KEY variable and paste your IAM access key

-   Create an AWS_SECRET_KEY variable and paste your IAM secret key

## Deploying App

Make a small change to your src/App.js file in the greeting text.

In the project root, in your terminal run:

```
git add.
git commit -m “testing deployment"
git push origin main
```

Go to your Travis Dashboard and check the status of your build.

The status should eventually return with a green checkmark and show "build passing"

Go to your AWS Elasticbeanstalk application

It should say _"Elastic Beanstalk is updating your environment"_

It should eventually show a green checkmark under "Health". You will now be able to access your application at the external URL provided under the environment name.
