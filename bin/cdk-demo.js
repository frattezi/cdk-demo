#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const cdk_demo_stack_1 = require("../lib/cdk-demo-stack");
const app = new cdk.App();
new cdk_demo_stack_1.CdkDemoStack(app, 'CdkUserDemo');
// Using custom config
// new CdkDemoStack(app, 'CdkDemoStack', { env: { account: 'DEFAULT', region: 'us-east-1' } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWRlbW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLDBEQUFxRDtBQUVyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLDZCQUFZLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBRXJDLHNCQUFzQjtBQUN0QiwrRkFBK0YiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBDZGtEZW1vU3RhY2sgfSBmcm9tICcuLi9saWIvY2RrLWRlbW8tc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xubmV3IENka0RlbW9TdGFjayhhcHAsICdDZGtVc2VyRGVtbycpO1xuXG4vLyBVc2luZyBjdXN0b20gY29uZmlnXG4vLyBuZXcgQ2RrRGVtb1N0YWNrKGFwcCwgJ0Nka0RlbW9TdGFjaycsIHsgZW52OiB7IGFjY291bnQ6ICdERUZBVUxUJywgcmVnaW9uOiAndXMtZWFzdC0xJyB9IH0pOyJdfQ==