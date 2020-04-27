"use strict";
exports.handler = (event, context, callback) => {
  var request = event.Records[0].cf.request;
  const headers = request.headers;

  const versionOne = "version=one";
  const versionTwo = "version=two";

  const versionOneDomain = "vesiononebucket3101.s3-website-us-east-1.amazonaws.com";
  const versionTwoDomain = "versiontwobucket3101.s3-website-us-east-1.amazonaws.com";

  let domain = "";

  if (headers.cookie) {
    for (let i = 0; i < headers.cookie.length; i++) {
      if (headers.cookie[i].value.indexOf(versionOne) >= 0) {
        domain = versionOneDomain;
        break;
      } else if (headers.cookie[i].value.indexOf(versionTwo) >= 0) {
        domain = versionTwoDomain;
        break;
      }
    }

    request.origin = {
      custom: {
        domainName: domain,
        port: 80,
        protocol: "http",
        path: "",
        sslProtocols: ["TLSv1", "TLSv1.1"],
        readTimeout: 5,
        keepaliveTimeout: 5,
        customHeaders: {},
      }
    };

    request.headers["host"] = [{ key: "host", value: domain }];
    callback(null, request);
  } else {
    callback(null, request);
    return;
  }
};
