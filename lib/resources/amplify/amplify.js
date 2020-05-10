"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codebuild = require("@aws-cdk/aws-codebuild");
const amplify = require("@aws-cdk/aws-amplify");
const cdk = require("@aws-cdk/core");
exports.setupAmplify = (app, id) => {
    var _a, _b;
    const amplifyApp = new amplify.App(app, 'Amplify', {
        sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
            owner: 'frattezi',
            repository: 'user-demo',
            // TODO: Use cdk.SecretValue Api
            oauthToken: cdk.SecretValue.plainText(((_b = (_a = process) === null || _a === void 0 ? void 0 : _a.env) === null || _b === void 0 ? void 0 : _b.GITHUB_TOKEN) || '')
        }),
        buildSpec: codebuild.BuildSpec.fromObject({
            version: '1.0',
            frontend: {
                phases: {
                    preBuild: {
                        commands: [
                            'yarn'
                        ]
                    },
                    build: {
                        commands: [
                            'yarn build'
                        ]
                    }
                },
                artifacts: {
                    baseDirectory: 'dist',
                    files: '**/*'
                }
            }
        })
    });
    const master = amplifyApp.addBranch('master', { autoBuild: true });
    master.addEnvironment('STAGE', 'prod');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1wbGlmeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFtcGxpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvREFBb0Q7QUFDcEQsZ0RBQWdEO0FBQ2hELHFDQUFxQztBQUV4QixRQUFBLFlBQVksR0FBRyxDQUFDLEdBQWtCLEVBQUUsRUFBVSxFQUFFLEVBQUU7O0lBQzdELE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFO1FBQ2pELGtCQUFrQixFQUFFLElBQUksT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ3ZELEtBQUssRUFBRSxVQUFVO1lBQ2pCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLGdDQUFnQztZQUNoQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBQSxPQUFPLDBDQUFFLEdBQUcsMENBQUUsWUFBWSxLQUFJLEVBQUUsQ0FBQztTQUN4RSxDQUFDO1FBQ0YsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUU7d0JBQ1IsUUFBUSxFQUFFOzRCQUNSLE1BQU07eUJBQ1A7cUJBQ0Y7b0JBQ0QsS0FBSyxFQUFFO3dCQUNMLFFBQVEsRUFBRTs0QkFDUixZQUFZO3lCQUNiO3FCQUNGO2lCQUNGO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxhQUFhLEVBQUUsTUFBTTtvQkFDckIsS0FBSyxFQUFFLE1BQU07aUJBQ2Q7YUFDRjtTQUNGLENBQUM7S0FDSCxDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvZGVidWlsZCBmcm9tICdAYXdzLWNkay9hd3MtY29kZWJ1aWxkJztcbmltcG9ydCAqIGFzIGFtcGxpZnkgZnJvbSAnQGF3cy1jZGsvYXdzLWFtcGxpZnknO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5leHBvcnQgY29uc3Qgc2V0dXBBbXBsaWZ5ID0gKGFwcDogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBhbXBsaWZ5QXBwID0gbmV3IGFtcGxpZnkuQXBwKGFwcCwgJ0FtcGxpZnknLCB7XG4gICAgc291cmNlQ29kZVByb3ZpZGVyOiBuZXcgYW1wbGlmeS5HaXRIdWJTb3VyY2VDb2RlUHJvdmlkZXIoe1xuICAgICAgb3duZXI6ICdmcmF0dGV6aScsXG4gICAgICByZXBvc2l0b3J5OiAndXNlci1kZW1vJyxcbiAgICAgIC8vIFRPRE86IFVzZSBjZGsuU2VjcmV0VmFsdWUgQXBpXG4gICAgICBvYXV0aFRva2VuOiBjZGsuU2VjcmV0VmFsdWUucGxhaW5UZXh0KHByb2Nlc3M/LmVudj8uR0lUSFVCX1RPS0VOIHx8ICcnKVxuICAgIH0pLFxuICAgIGJ1aWxkU3BlYzogY29kZWJ1aWxkLkJ1aWxkU3BlYy5mcm9tT2JqZWN0KHsgLy8gQWx0ZXJuYXRpdmVseSBhZGQgYSBgYW1wbGlmeS55bWxgIHRvIHRoZSByZXBvXG4gICAgICB2ZXJzaW9uOiAnMS4wJyxcbiAgICAgIGZyb250ZW5kOiB7XG4gICAgICAgIHBoYXNlczoge1xuICAgICAgICAgIHByZUJ1aWxkOiB7XG4gICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAneWFybidcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAneWFybiBidWlsZCdcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFydGlmYWN0czoge1xuICAgICAgICAgIGJhc2VEaXJlY3Rvcnk6ICdkaXN0JyxcbiAgICAgICAgICBmaWxlczogJyoqLyonXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KTtcbiAgY29uc3QgbWFzdGVyID0gYW1wbGlmeUFwcC5hZGRCcmFuY2goJ21hc3RlcicsIHsgYXV0b0J1aWxkOiB0cnVlIH0pO1xuICBtYXN0ZXIuYWRkRW52aXJvbm1lbnQoJ1NUQUdFJywgJ3Byb2QnKTtcbn1cblxuIl19