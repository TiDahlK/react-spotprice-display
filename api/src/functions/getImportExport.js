const { app } = require("@azure/functions");
const NATIONAL_AREAS = new Set(["SE1", "SE2", "SE3", "SE4"]);

const mock_data = {
  updatedAt: "2025-03-18T09:39:51.7566804Z",
  deliveryDateCET: "2025-03-17",
  deliveryArea: "SE4",
  content: [
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1063,
          netPosition: -1063,
        },
        LT: {
          import: 0,
          export: 322,
          netPosition: -322,
        },
        SE3: {
          import: 4091,
          export: 0,
          netPosition: 4091,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 583,
          netPosition: -583,
        },
      },
      totalExport: 2585,
      totalImport: 4091,
      totalNetPosition: 1506,
      deliveryStart: "2025-03-16T23:00:00Z",
      deliveryEnd: "2025-03-16T23:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1063,
          netPosition: -1063,
        },
        LT: {
          import: 0,
          export: 322,
          netPosition: -322,
        },
        SE3: {
          import: 4091,
          export: 0,
          netPosition: 4091,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 583,
          netPosition: -583,
        },
      },
      totalExport: 2585,
      totalImport: 4091,
      totalNetPosition: 1506,
      deliveryStart: "2025-03-16T23:15:00Z",
      deliveryEnd: "2025-03-16T23:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1063,
          netPosition: -1063,
        },
        LT: {
          import: 0,
          export: 322,
          netPosition: -322,
        },
        SE3: {
          import: 4091,
          export: 0,
          netPosition: 4091,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 583,
          netPosition: -583,
        },
      },
      totalExport: 2585,
      totalImport: 4091,
      totalNetPosition: 1506,
      deliveryStart: "2025-03-16T23:30:00Z",
      deliveryEnd: "2025-03-16T23:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1063,
          netPosition: -1063,
        },
        LT: {
          import: 0,
          export: 322,
          netPosition: -322,
        },
        SE3: {
          import: 4091,
          export: 0,
          netPosition: 4091,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 583,
          netPosition: -583,
        },
      },
      totalExport: 2585,
      totalImport: 4091,
      totalNetPosition: 1506,
      deliveryStart: "2025-03-16T23:45:00Z",
      deliveryEnd: "2025-03-17T00:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1092,
          netPosition: -1092,
        },
        LT: {
          import: 0,
          export: 279,
          netPosition: -279,
        },
        SE3: {
          import: 4105,
          export: 0,
          netPosition: 4105,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2585,
      totalImport: 4105,
      totalNetPosition: 1520,
      deliveryStart: "2025-03-17T00:00:00Z",
      deliveryEnd: "2025-03-17T00:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1092,
          netPosition: -1092,
        },
        LT: {
          import: 0,
          export: 279,
          netPosition: -279,
        },
        SE3: {
          import: 4105,
          export: 0,
          netPosition: 4105,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2585,
      totalImport: 4105,
      totalNetPosition: 1520,
      deliveryStart: "2025-03-17T00:15:00Z",
      deliveryEnd: "2025-03-17T00:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1092,
          netPosition: -1092,
        },
        LT: {
          import: 0,
          export: 279,
          netPosition: -279,
        },
        SE3: {
          import: 4105,
          export: 0,
          netPosition: 4105,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2585,
      totalImport: 4105,
      totalNetPosition: 1520,
      deliveryStart: "2025-03-17T00:30:00Z",
      deliveryEnd: "2025-03-17T00:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1092,
          netPosition: -1092,
        },
        LT: {
          import: 0,
          export: 279,
          netPosition: -279,
        },
        SE3: {
          import: 4105,
          export: 0,
          netPosition: 4105,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2585,
      totalImport: 4105,
      totalNetPosition: 1520,
      deliveryStart: "2025-03-17T00:45:00Z",
      deliveryEnd: "2025-03-17T01:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1091,
          netPosition: -1091,
        },
        LT: {
          import: 0,
          export: 265,
          netPosition: -265,
        },
        SE3: {
          import: 4133,
          export: 0,
          netPosition: 4133,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2570,
      totalImport: 4133,
      totalNetPosition: 1563,
      deliveryStart: "2025-03-17T01:00:00Z",
      deliveryEnd: "2025-03-17T01:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1091,
          netPosition: -1091,
        },
        LT: {
          import: 0,
          export: 265,
          netPosition: -265,
        },
        SE3: {
          import: 4133,
          export: 0,
          netPosition: 4133,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2570,
      totalImport: 4133,
      totalNetPosition: 1563,
      deliveryStart: "2025-03-17T01:15:00Z",
      deliveryEnd: "2025-03-17T01:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1091,
          netPosition: -1091,
        },
        LT: {
          import: 0,
          export: 265,
          netPosition: -265,
        },
        SE3: {
          import: 4133,
          export: 0,
          netPosition: 4133,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2570,
      totalImport: 4133,
      totalNetPosition: 1563,
      deliveryStart: "2025-03-17T01:30:00Z",
      deliveryEnd: "2025-03-17T01:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1091,
          netPosition: -1091,
        },
        LT: {
          import: 0,
          export: 265,
          netPosition: -265,
        },
        SE3: {
          import: 4133,
          export: 0,
          netPosition: 4133,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2570,
      totalImport: 4133,
      totalNetPosition: 1563,
      deliveryStart: "2025-03-17T01:45:00Z",
      deliveryEnd: "2025-03-17T02:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1111,
          netPosition: -1111,
        },
        LT: {
          import: 0,
          export: 257,
          netPosition: -257,
        },
        SE3: {
          import: 4138,
          export: 0,
          netPosition: 4138,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2582,
      totalImport: 4138,
      totalNetPosition: 1556,
      deliveryStart: "2025-03-17T02:00:00Z",
      deliveryEnd: "2025-03-17T02:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1111,
          netPosition: -1111,
        },
        LT: {
          import: 0,
          export: 257,
          netPosition: -257,
        },
        SE3: {
          import: 4138,
          export: 0,
          netPosition: 4138,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2582,
      totalImport: 4138,
      totalNetPosition: 1556,
      deliveryStart: "2025-03-17T02:15:00Z",
      deliveryEnd: "2025-03-17T02:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1111,
          netPosition: -1111,
        },
        LT: {
          import: 0,
          export: 257,
          netPosition: -257,
        },
        SE3: {
          import: 4138,
          export: 0,
          netPosition: 4138,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2582,
      totalImport: 4138,
      totalNetPosition: 1556,
      deliveryStart: "2025-03-17T02:30:00Z",
      deliveryEnd: "2025-03-17T02:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1111,
          netPosition: -1111,
        },
        LT: {
          import: 0,
          export: 257,
          netPosition: -257,
        },
        SE3: {
          import: 4138,
          export: 0,
          netPosition: 4138,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2582,
      totalImport: 4138,
      totalNetPosition: 1556,
      deliveryStart: "2025-03-17T02:45:00Z",
      deliveryEnd: "2025-03-17T03:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1145,
          netPosition: -1145,
        },
        LT: {
          import: 0,
          export: 407,
          netPosition: -407,
        },
        SE3: {
          import: 4379,
          export: 0,
          netPosition: 4379,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 566,
          netPosition: -566,
        },
      },
      totalExport: 2735,
      totalImport: 4379,
      totalNetPosition: 1644,
      deliveryStart: "2025-03-17T03:00:00Z",
      deliveryEnd: "2025-03-17T03:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1145,
          netPosition: -1145,
        },
        LT: {
          import: 0,
          export: 407,
          netPosition: -407,
        },
        SE3: {
          import: 4379,
          export: 0,
          netPosition: 4379,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 566,
          netPosition: -566,
        },
      },
      totalExport: 2735,
      totalImport: 4379,
      totalNetPosition: 1644,
      deliveryStart: "2025-03-17T03:15:00Z",
      deliveryEnd: "2025-03-17T03:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1145,
          netPosition: -1145,
        },
        LT: {
          import: 0,
          export: 407,
          netPosition: -407,
        },
        SE3: {
          import: 4379,
          export: 0,
          netPosition: 4379,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 566,
          netPosition: -566,
        },
      },
      totalExport: 2735,
      totalImport: 4379,
      totalNetPosition: 1644,
      deliveryStart: "2025-03-17T03:30:00Z",
      deliveryEnd: "2025-03-17T03:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1145,
          netPosition: -1145,
        },
        LT: {
          import: 0,
          export: 407,
          netPosition: -407,
        },
        SE3: {
          import: 4379,
          export: 0,
          netPosition: 4379,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 566,
          netPosition: -566,
        },
      },
      totalExport: 2735,
      totalImport: 4379,
      totalNetPosition: 1644,
      deliveryStart: "2025-03-17T03:45:00Z",
      deliveryEnd: "2025-03-17T04:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 823,
          netPosition: -823,
        },
        LT: {
          import: 0,
          export: 703,
          netPosition: -703,
        },
        SE3: {
          import: 4316,
          export: 0,
          netPosition: 4316,
        },
        "DE-LU": {
          import: 0,
          export: 602,
          netPosition: -602,
        },
        PL: {
          import: 0,
          export: 311,
          netPosition: -311,
        },
      },
      totalExport: 2439,
      totalImport: 4316,
      totalNetPosition: 1877,
      deliveryStart: "2025-03-17T04:00:00Z",
      deliveryEnd: "2025-03-17T04:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 823,
          netPosition: -823,
        },
        LT: {
          import: 0,
          export: 703,
          netPosition: -703,
        },
        SE3: {
          import: 4316,
          export: 0,
          netPosition: 4316,
        },
        "DE-LU": {
          import: 0,
          export: 602,
          netPosition: -602,
        },
        PL: {
          import: 0,
          export: 311,
          netPosition: -311,
        },
      },
      totalExport: 2439,
      totalImport: 4316,
      totalNetPosition: 1877,
      deliveryStart: "2025-03-17T04:15:00Z",
      deliveryEnd: "2025-03-17T04:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 823,
          netPosition: -823,
        },
        LT: {
          import: 0,
          export: 703,
          netPosition: -703,
        },
        SE3: {
          import: 4316,
          export: 0,
          netPosition: 4316,
        },
        "DE-LU": {
          import: 0,
          export: 602,
          netPosition: -602,
        },
        PL: {
          import: 0,
          export: 311,
          netPosition: -311,
        },
      },
      totalExport: 2439,
      totalImport: 4316,
      totalNetPosition: 1877,
      deliveryStart: "2025-03-17T04:30:00Z",
      deliveryEnd: "2025-03-17T04:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 823,
          netPosition: -823,
        },
        LT: {
          import: 0,
          export: 703,
          netPosition: -703,
        },
        SE3: {
          import: 4316,
          export: 0,
          netPosition: 4316,
        },
        "DE-LU": {
          import: 0,
          export: 602,
          netPosition: -602,
        },
        PL: {
          import: 0,
          export: 311,
          netPosition: -311,
        },
      },
      totalExport: 2439,
      totalImport: 4316,
      totalNetPosition: 1877,
      deliveryStart: "2025-03-17T04:45:00Z",
      deliveryEnd: "2025-03-17T05:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 373,
          netPosition: -373,
        },
        LT: {
          import: 0,
          export: 718,
          netPosition: -718,
        },
        SE3: {
          import: 3480,
          export: 0,
          netPosition: 3480,
        },
        "DE-LU": {
          import: 0,
          export: 104,
          netPosition: -104,
        },
        PL: {
          import: 24,
          export: 45,
          netPosition: -21,
        },
      },
      totalExport: 1240,
      totalImport: 3504,
      totalNetPosition: 2264,
      deliveryStart: "2025-03-17T05:00:00Z",
      deliveryEnd: "2025-03-17T05:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 373,
          netPosition: -373,
        },
        LT: {
          import: 0,
          export: 718,
          netPosition: -718,
        },
        SE3: {
          import: 3480,
          export: 0,
          netPosition: 3480,
        },
        "DE-LU": {
          import: 0,
          export: 104,
          netPosition: -104,
        },
        PL: {
          import: 24,
          export: 45,
          netPosition: -21,
        },
      },
      totalExport: 1240,
      totalImport: 3504,
      totalNetPosition: 2264,
      deliveryStart: "2025-03-17T05:15:00Z",
      deliveryEnd: "2025-03-17T05:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 373,
          netPosition: -373,
        },
        LT: {
          import: 0,
          export: 718,
          netPosition: -718,
        },
        SE3: {
          import: 3480,
          export: 0,
          netPosition: 3480,
        },
        "DE-LU": {
          import: 0,
          export: 104,
          netPosition: -104,
        },
        PL: {
          import: 24,
          export: 45,
          netPosition: -21,
        },
      },
      totalExport: 1240,
      totalImport: 3504,
      totalNetPosition: 2264,
      deliveryStart: "2025-03-17T05:30:00Z",
      deliveryEnd: "2025-03-17T05:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 373,
          netPosition: -373,
        },
        LT: {
          import: 0,
          export: 718,
          netPosition: -718,
        },
        SE3: {
          import: 3480,
          export: 0,
          netPosition: 3480,
        },
        "DE-LU": {
          import: 0,
          export: 104,
          netPosition: -104,
        },
        PL: {
          import: 24,
          export: 45,
          netPosition: -21,
        },
      },
      totalExport: 1240,
      totalImport: 3504,
      totalNetPosition: 2264,
      deliveryStart: "2025-03-17T05:45:00Z",
      deliveryEnd: "2025-03-17T06:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 630,
          netPosition: -630,
        },
        LT: {
          import: 0,
          export: 325,
          netPosition: -325,
        },
        SE3: {
          import: 2648,
          export: 0,
          netPosition: 2648,
        },
        "DE-LU": {
          import: 495,
          export: 0,
          netPosition: 495,
        },
        PL: {
          import: 296,
          export: 0,
          netPosition: 296,
        },
      },
      totalExport: 955,
      totalImport: 3439,
      totalNetPosition: 2484,
      deliveryStart: "2025-03-17T06:00:00Z",
      deliveryEnd: "2025-03-17T06:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 630,
          netPosition: -630,
        },
        LT: {
          import: 0,
          export: 325,
          netPosition: -325,
        },
        SE3: {
          import: 2648,
          export: 0,
          netPosition: 2648,
        },
        "DE-LU": {
          import: 495,
          export: 0,
          netPosition: 495,
        },
        PL: {
          import: 296,
          export: 0,
          netPosition: 296,
        },
      },
      totalExport: 955,
      totalImport: 3439,
      totalNetPosition: 2484,
      deliveryStart: "2025-03-17T06:15:00Z",
      deliveryEnd: "2025-03-17T06:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 630,
          netPosition: -630,
        },
        LT: {
          import: 0,
          export: 325,
          netPosition: -325,
        },
        SE3: {
          import: 2648,
          export: 0,
          netPosition: 2648,
        },
        "DE-LU": {
          import: 495,
          export: 0,
          netPosition: 495,
        },
        PL: {
          import: 296,
          export: 0,
          netPosition: 296,
        },
      },
      totalExport: 955,
      totalImport: 3439,
      totalNetPosition: 2484,
      deliveryStart: "2025-03-17T06:30:00Z",
      deliveryEnd: "2025-03-17T06:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 630,
          netPosition: -630,
        },
        LT: {
          import: 0,
          export: 325,
          netPosition: -325,
        },
        SE3: {
          import: 2648,
          export: 0,
          netPosition: 2648,
        },
        "DE-LU": {
          import: 495,
          export: 0,
          netPosition: 495,
        },
        PL: {
          import: 296,
          export: 0,
          netPosition: 296,
        },
      },
      totalExport: 955,
      totalImport: 3439,
      totalNetPosition: 2484,
      deliveryStart: "2025-03-17T06:45:00Z",
      deliveryEnd: "2025-03-17T07:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 913,
          netPosition: -913,
        },
        LT: {
          import: 230,
          export: 0,
          netPosition: 230,
        },
        SE3: {
          import: 2354,
          export: 0,
          netPosition: 2354,
        },
        "DE-LU": {
          import: 254,
          export: 0,
          netPosition: 254,
        },
        PL: {
          import: 574,
          export: 0,
          netPosition: 574,
        },
      },
      totalExport: 913,
      totalImport: 3412,
      totalNetPosition: 2499,
      deliveryStart: "2025-03-17T07:00:00Z",
      deliveryEnd: "2025-03-17T07:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 913,
          netPosition: -913,
        },
        LT: {
          import: 230,
          export: 0,
          netPosition: 230,
        },
        SE3: {
          import: 2354,
          export: 0,
          netPosition: 2354,
        },
        "DE-LU": {
          import: 254,
          export: 0,
          netPosition: 254,
        },
        PL: {
          import: 574,
          export: 0,
          netPosition: 574,
        },
      },
      totalExport: 913,
      totalImport: 3412,
      totalNetPosition: 2499,
      deliveryStart: "2025-03-17T07:15:00Z",
      deliveryEnd: "2025-03-17T07:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 913,
          netPosition: -913,
        },
        LT: {
          import: 230,
          export: 0,
          netPosition: 230,
        },
        SE3: {
          import: 2354,
          export: 0,
          netPosition: 2354,
        },
        "DE-LU": {
          import: 254,
          export: 0,
          netPosition: 254,
        },
        PL: {
          import: 574,
          export: 0,
          netPosition: 574,
        },
      },
      totalExport: 913,
      totalImport: 3412,
      totalNetPosition: 2499,
      deliveryStart: "2025-03-17T07:30:00Z",
      deliveryEnd: "2025-03-17T07:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 913,
          netPosition: -913,
        },
        LT: {
          import: 230,
          export: 0,
          netPosition: 230,
        },
        SE3: {
          import: 2354,
          export: 0,
          netPosition: 2354,
        },
        "DE-LU": {
          import: 254,
          export: 0,
          netPosition: 254,
        },
        PL: {
          import: 574,
          export: 0,
          netPosition: 574,
        },
      },
      totalExport: 913,
      totalImport: 3412,
      totalNetPosition: 2499,
      deliveryStart: "2025-03-17T07:45:00Z",
      deliveryEnd: "2025-03-17T08:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 319,
          export: 0,
          netPosition: 319,
        },
        SE3: {
          import: 2766,
          export: 0,
          netPosition: 2766,
        },
        "DE-LU": {
          import: 0,
          export: 295,
          netPosition: -295,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1475,
      totalImport: 3702,
      totalNetPosition: 2227,
      deliveryStart: "2025-03-17T08:00:00Z",
      deliveryEnd: "2025-03-17T08:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 319,
          export: 0,
          netPosition: 319,
        },
        SE3: {
          import: 2766,
          export: 0,
          netPosition: 2766,
        },
        "DE-LU": {
          import: 0,
          export: 295,
          netPosition: -295,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1475,
      totalImport: 3702,
      totalNetPosition: 2227,
      deliveryStart: "2025-03-17T08:15:00Z",
      deliveryEnd: "2025-03-17T08:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 319,
          export: 0,
          netPosition: 319,
        },
        SE3: {
          import: 2766,
          export: 0,
          netPosition: 2766,
        },
        "DE-LU": {
          import: 0,
          export: 295,
          netPosition: -295,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1475,
      totalImport: 3702,
      totalNetPosition: 2227,
      deliveryStart: "2025-03-17T08:30:00Z",
      deliveryEnd: "2025-03-17T08:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 319,
          export: 0,
          netPosition: 319,
        },
        SE3: {
          import: 2766,
          export: 0,
          netPosition: 2766,
        },
        "DE-LU": {
          import: 0,
          export: 295,
          netPosition: -295,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1475,
      totalImport: 3702,
      totalNetPosition: 2227,
      deliveryStart: "2025-03-17T08:45:00Z",
      deliveryEnd: "2025-03-17T09:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1235,
          netPosition: -1235,
        },
        LT: {
          import: 491,
          export: 0,
          netPosition: 491,
        },
        SE3: {
          import: 2645,
          export: 0,
          netPosition: 2645,
        },
        "DE-LU": {
          import: 0,
          export: 599,
          netPosition: -599,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1834,
      totalImport: 3753,
      totalNetPosition: 1919,
      deliveryStart: "2025-03-17T09:00:00Z",
      deliveryEnd: "2025-03-17T09:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1235,
          netPosition: -1235,
        },
        LT: {
          import: 491,
          export: 0,
          netPosition: 491,
        },
        SE3: {
          import: 2645,
          export: 0,
          netPosition: 2645,
        },
        "DE-LU": {
          import: 0,
          export: 599,
          netPosition: -599,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1834,
      totalImport: 3753,
      totalNetPosition: 1919,
      deliveryStart: "2025-03-17T09:15:00Z",
      deliveryEnd: "2025-03-17T09:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1235,
          netPosition: -1235,
        },
        LT: {
          import: 491,
          export: 0,
          netPosition: 491,
        },
        SE3: {
          import: 2645,
          export: 0,
          netPosition: 2645,
        },
        "DE-LU": {
          import: 0,
          export: 599,
          netPosition: -599,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1834,
      totalImport: 3753,
      totalNetPosition: 1919,
      deliveryStart: "2025-03-17T09:30:00Z",
      deliveryEnd: "2025-03-17T09:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1235,
          netPosition: -1235,
        },
        LT: {
          import: 491,
          export: 0,
          netPosition: 491,
        },
        SE3: {
          import: 2645,
          export: 0,
          netPosition: 2645,
        },
        "DE-LU": {
          import: 0,
          export: 599,
          netPosition: -599,
        },
        PL: {
          import: 617,
          export: 0,
          netPosition: 617,
        },
      },
      totalExport: 1834,
      totalImport: 3753,
      totalNetPosition: 1919,
      deliveryStart: "2025-03-17T09:45:00Z",
      deliveryEnd: "2025-03-17T10:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 448,
          export: 0,
          netPosition: 448,
        },
        SE3: {
          import: 2472,
          export: 0,
          netPosition: 2472,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 595,
          export: 0,
          netPosition: 595,
        },
      },
      totalExport: 1797,
      totalImport: 3515,
      totalNetPosition: 1718,
      deliveryStart: "2025-03-17T10:00:00Z",
      deliveryEnd: "2025-03-17T10:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 448,
          export: 0,
          netPosition: 448,
        },
        SE3: {
          import: 2472,
          export: 0,
          netPosition: 2472,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 595,
          export: 0,
          netPosition: 595,
        },
      },
      totalExport: 1797,
      totalImport: 3515,
      totalNetPosition: 1718,
      deliveryStart: "2025-03-17T10:15:00Z",
      deliveryEnd: "2025-03-17T10:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 448,
          export: 0,
          netPosition: 448,
        },
        SE3: {
          import: 2472,
          export: 0,
          netPosition: 2472,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 595,
          export: 0,
          netPosition: 595,
        },
      },
      totalExport: 1797,
      totalImport: 3515,
      totalNetPosition: 1718,
      deliveryStart: "2025-03-17T10:30:00Z",
      deliveryEnd: "2025-03-17T10:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1180,
          netPosition: -1180,
        },
        LT: {
          import: 448,
          export: 0,
          netPosition: 448,
        },
        SE3: {
          import: 2472,
          export: 0,
          netPosition: 2472,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 595,
          export: 0,
          netPosition: 595,
        },
      },
      totalExport: 1797,
      totalImport: 3515,
      totalNetPosition: 1718,
      deliveryStart: "2025-03-17T10:45:00Z",
      deliveryEnd: "2025-03-17T11:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 725,
          netPosition: -725,
        },
        LT: {
          import: 220,
          export: 0,
          netPosition: 220,
        },
        SE3: {
          import: 2184,
          export: 0,
          netPosition: 2184,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 404,
          export: 0,
          netPosition: 404,
        },
      },
      totalExport: 1342,
      totalImport: 2808,
      totalNetPosition: 1466,
      deliveryStart: "2025-03-17T11:00:00Z",
      deliveryEnd: "2025-03-17T11:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 725,
          netPosition: -725,
        },
        LT: {
          import: 220,
          export: 0,
          netPosition: 220,
        },
        SE3: {
          import: 2184,
          export: 0,
          netPosition: 2184,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 404,
          export: 0,
          netPosition: 404,
        },
      },
      totalExport: 1342,
      totalImport: 2808,
      totalNetPosition: 1466,
      deliveryStart: "2025-03-17T11:15:00Z",
      deliveryEnd: "2025-03-17T11:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 725,
          netPosition: -725,
        },
        LT: {
          import: 220,
          export: 0,
          netPosition: 220,
        },
        SE3: {
          import: 2184,
          export: 0,
          netPosition: 2184,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 404,
          export: 0,
          netPosition: 404,
        },
      },
      totalExport: 1342,
      totalImport: 2808,
      totalNetPosition: 1466,
      deliveryStart: "2025-03-17T11:30:00Z",
      deliveryEnd: "2025-03-17T11:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 725,
          netPosition: -725,
        },
        LT: {
          import: 220,
          export: 0,
          netPosition: 220,
        },
        SE3: {
          import: 2184,
          export: 0,
          netPosition: 2184,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 404,
          export: 0,
          netPosition: 404,
        },
      },
      totalExport: 1342,
      totalImport: 2808,
      totalNetPosition: 1466,
      deliveryStart: "2025-03-17T11:45:00Z",
      deliveryEnd: "2025-03-17T12:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 523,
          netPosition: -523,
        },
        LT: {
          import: 0,
          export: 204,
          netPosition: -204,
        },
        SE3: {
          import: 2489,
          export: 0,
          netPosition: 2489,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 102,
          export: 0,
          netPosition: 102,
        },
      },
      totalExport: 1344,
      totalImport: 2591,
      totalNetPosition: 1247,
      deliveryStart: "2025-03-17T12:00:00Z",
      deliveryEnd: "2025-03-17T12:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 523,
          netPosition: -523,
        },
        LT: {
          import: 0,
          export: 204,
          netPosition: -204,
        },
        SE3: {
          import: 2489,
          export: 0,
          netPosition: 2489,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 102,
          export: 0,
          netPosition: 102,
        },
      },
      totalExport: 1344,
      totalImport: 2591,
      totalNetPosition: 1247,
      deliveryStart: "2025-03-17T12:15:00Z",
      deliveryEnd: "2025-03-17T12:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 523,
          netPosition: -523,
        },
        LT: {
          import: 0,
          export: 204,
          netPosition: -204,
        },
        SE3: {
          import: 2489,
          export: 0,
          netPosition: 2489,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 102,
          export: 0,
          netPosition: 102,
        },
      },
      totalExport: 1344,
      totalImport: 2591,
      totalNetPosition: 1247,
      deliveryStart: "2025-03-17T12:30:00Z",
      deliveryEnd: "2025-03-17T12:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 523,
          netPosition: -523,
        },
        LT: {
          import: 0,
          export: 204,
          netPosition: -204,
        },
        SE3: {
          import: 2489,
          export: 0,
          netPosition: 2489,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 102,
          export: 0,
          netPosition: 102,
        },
      },
      totalExport: 1344,
      totalImport: 2591,
      totalNetPosition: 1247,
      deliveryStart: "2025-03-17T12:45:00Z",
      deliveryEnd: "2025-03-17T13:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 974,
          netPosition: -974,
        },
        LT: {
          import: 0,
          export: 378,
          netPosition: -378,
        },
        SE3: {
          import: 3289,
          export: 0,
          netPosition: 3289,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 200,
          netPosition: -200,
        },
      },
      totalExport: 2169,
      totalImport: 3289,
      totalNetPosition: 1120,
      deliveryStart: "2025-03-17T13:00:00Z",
      deliveryEnd: "2025-03-17T13:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 974,
          netPosition: -974,
        },
        LT: {
          import: 0,
          export: 378,
          netPosition: -378,
        },
        SE3: {
          import: 3289,
          export: 0,
          netPosition: 3289,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 200,
          netPosition: -200,
        },
      },
      totalExport: 2169,
      totalImport: 3289,
      totalNetPosition: 1120,
      deliveryStart: "2025-03-17T13:15:00Z",
      deliveryEnd: "2025-03-17T13:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 974,
          netPosition: -974,
        },
        LT: {
          import: 0,
          export: 378,
          netPosition: -378,
        },
        SE3: {
          import: 3289,
          export: 0,
          netPosition: 3289,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 200,
          netPosition: -200,
        },
      },
      totalExport: 2169,
      totalImport: 3289,
      totalNetPosition: 1120,
      deliveryStart: "2025-03-17T13:30:00Z",
      deliveryEnd: "2025-03-17T13:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 974,
          netPosition: -974,
        },
        LT: {
          import: 0,
          export: 378,
          netPosition: -378,
        },
        SE3: {
          import: 3289,
          export: 0,
          netPosition: 3289,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 200,
          netPosition: -200,
        },
      },
      totalExport: 2169,
      totalImport: 3289,
      totalNetPosition: 1120,
      deliveryStart: "2025-03-17T13:45:00Z",
      deliveryEnd: "2025-03-17T14:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 852,
          netPosition: -852,
        },
        LT: {
          import: 0,
          export: 719,
          netPosition: -719,
        },
        SE3: {
          import: 3397,
          export: 0,
          netPosition: 3397,
        },
        "DE-LU": {
          import: 0,
          export: 199,
          netPosition: -199,
        },
        PL: {
          import: 0,
          export: 477,
          netPosition: -477,
        },
      },
      totalExport: 2247,
      totalImport: 3397,
      totalNetPosition: 1150,
      deliveryStart: "2025-03-17T14:00:00Z",
      deliveryEnd: "2025-03-17T14:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 852,
          netPosition: -852,
        },
        LT: {
          import: 0,
          export: 719,
          netPosition: -719,
        },
        SE3: {
          import: 3397,
          export: 0,
          netPosition: 3397,
        },
        "DE-LU": {
          import: 0,
          export: 199,
          netPosition: -199,
        },
        PL: {
          import: 0,
          export: 477,
          netPosition: -477,
        },
      },
      totalExport: 2247,
      totalImport: 3397,
      totalNetPosition: 1150,
      deliveryStart: "2025-03-17T14:15:00Z",
      deliveryEnd: "2025-03-17T14:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 852,
          netPosition: -852,
        },
        LT: {
          import: 0,
          export: 719,
          netPosition: -719,
        },
        SE3: {
          import: 3397,
          export: 0,
          netPosition: 3397,
        },
        "DE-LU": {
          import: 0,
          export: 199,
          netPosition: -199,
        },
        PL: {
          import: 0,
          export: 477,
          netPosition: -477,
        },
      },
      totalExport: 2247,
      totalImport: 3397,
      totalNetPosition: 1150,
      deliveryStart: "2025-03-17T14:30:00Z",
      deliveryEnd: "2025-03-17T14:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 852,
          netPosition: -852,
        },
        LT: {
          import: 0,
          export: 719,
          netPosition: -719,
        },
        SE3: {
          import: 3397,
          export: 0,
          netPosition: 3397,
        },
        "DE-LU": {
          import: 0,
          export: 199,
          netPosition: -199,
        },
        PL: {
          import: 0,
          export: 477,
          netPosition: -477,
        },
      },
      totalExport: 2247,
      totalImport: 3397,
      totalNetPosition: 1150,
      deliveryStart: "2025-03-17T14:45:00Z",
      deliveryEnd: "2025-03-17T15:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 894,
          netPosition: -894,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 3578,
          export: 0,
          netPosition: 3578,
        },
        "DE-LU": {
          import: 0,
          export: 6,
          netPosition: -6,
        },
        PL: {
          import: 0,
          export: 584,
          netPosition: -584,
        },
      },
      totalExport: 2215,
      totalImport: 3578,
      totalNetPosition: 1363,
      deliveryStart: "2025-03-17T15:00:00Z",
      deliveryEnd: "2025-03-17T15:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 894,
          netPosition: -894,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 3578,
          export: 0,
          netPosition: 3578,
        },
        "DE-LU": {
          import: 0,
          export: 6,
          netPosition: -6,
        },
        PL: {
          import: 0,
          export: 584,
          netPosition: -584,
        },
      },
      totalExport: 2215,
      totalImport: 3578,
      totalNetPosition: 1363,
      deliveryStart: "2025-03-17T15:15:00Z",
      deliveryEnd: "2025-03-17T15:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 894,
          netPosition: -894,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 3578,
          export: 0,
          netPosition: 3578,
        },
        "DE-LU": {
          import: 0,
          export: 6,
          netPosition: -6,
        },
        PL: {
          import: 0,
          export: 584,
          netPosition: -584,
        },
      },
      totalExport: 2215,
      totalImport: 3578,
      totalNetPosition: 1363,
      deliveryStart: "2025-03-17T15:30:00Z",
      deliveryEnd: "2025-03-17T15:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 894,
          netPosition: -894,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 3578,
          export: 0,
          netPosition: 3578,
        },
        "DE-LU": {
          import: 0,
          export: 6,
          netPosition: -6,
        },
        PL: {
          import: 0,
          export: 584,
          netPosition: -584,
        },
      },
      totalExport: 2215,
      totalImport: 3578,
      totalNetPosition: 1363,
      deliveryStart: "2025-03-17T15:45:00Z",
      deliveryEnd: "2025-03-17T16:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1179,
          netPosition: -1179,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 4214,
          export: 0,
          netPosition: 4214,
        },
        "DE-LU": {
          import: 0,
          export: 0,
          netPosition: 0,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2507,
      totalImport: 4214,
      totalNetPosition: 1707,
      deliveryStart: "2025-03-17T16:00:00Z",
      deliveryEnd: "2025-03-17T16:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1179,
          netPosition: -1179,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 4214,
          export: 0,
          netPosition: 4214,
        },
        "DE-LU": {
          import: 0,
          export: 0,
          netPosition: 0,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2507,
      totalImport: 4214,
      totalNetPosition: 1707,
      deliveryStart: "2025-03-17T16:15:00Z",
      deliveryEnd: "2025-03-17T16:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1179,
          netPosition: -1179,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 4214,
          export: 0,
          netPosition: 4214,
        },
        "DE-LU": {
          import: 0,
          export: 0,
          netPosition: 0,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2507,
      totalImport: 4214,
      totalNetPosition: 1707,
      deliveryStart: "2025-03-17T16:30:00Z",
      deliveryEnd: "2025-03-17T16:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1179,
          netPosition: -1179,
        },
        LT: {
          import: 0,
          export: 731,
          netPosition: -731,
        },
        SE3: {
          import: 4214,
          export: 0,
          netPosition: 4214,
        },
        "DE-LU": {
          import: 0,
          export: 0,
          netPosition: 0,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2507,
      totalImport: 4214,
      totalNetPosition: 1707,
      deliveryStart: "2025-03-17T16:45:00Z",
      deliveryEnd: "2025-03-17T17:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 966,
          netPosition: -966,
        },
        LT: {
          import: 0,
          export: 671,
          netPosition: -671,
        },
        SE3: {
          import: 4481,
          export: 0,
          netPosition: 4481,
        },
        "DE-LU": {
          import: 0,
          export: 462,
          netPosition: -462,
        },
        PL: {
          import: 0,
          export: 586,
          netPosition: -586,
        },
      },
      totalExport: 2685,
      totalImport: 4481,
      totalNetPosition: 1796,
      deliveryStart: "2025-03-17T17:00:00Z",
      deliveryEnd: "2025-03-17T17:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 966,
          netPosition: -966,
        },
        LT: {
          import: 0,
          export: 671,
          netPosition: -671,
        },
        SE3: {
          import: 4481,
          export: 0,
          netPosition: 4481,
        },
        "DE-LU": {
          import: 0,
          export: 462,
          netPosition: -462,
        },
        PL: {
          import: 0,
          export: 586,
          netPosition: -586,
        },
      },
      totalExport: 2685,
      totalImport: 4481,
      totalNetPosition: 1796,
      deliveryStart: "2025-03-17T17:15:00Z",
      deliveryEnd: "2025-03-17T17:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 966,
          netPosition: -966,
        },
        LT: {
          import: 0,
          export: 671,
          netPosition: -671,
        },
        SE3: {
          import: 4481,
          export: 0,
          netPosition: 4481,
        },
        "DE-LU": {
          import: 0,
          export: 462,
          netPosition: -462,
        },
        PL: {
          import: 0,
          export: 586,
          netPosition: -586,
        },
      },
      totalExport: 2685,
      totalImport: 4481,
      totalNetPosition: 1796,
      deliveryStart: "2025-03-17T17:30:00Z",
      deliveryEnd: "2025-03-17T17:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 966,
          netPosition: -966,
        },
        LT: {
          import: 0,
          export: 671,
          netPosition: -671,
        },
        SE3: {
          import: 4481,
          export: 0,
          netPosition: 4481,
        },
        "DE-LU": {
          import: 0,
          export: 462,
          netPosition: -462,
        },
        PL: {
          import: 0,
          export: 586,
          netPosition: -586,
        },
      },
      totalExport: 2685,
      totalImport: 4481,
      totalNetPosition: 1796,
      deliveryStart: "2025-03-17T17:45:00Z",
      deliveryEnd: "2025-03-17T18:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1096,
          netPosition: -1096,
        },
        LT: {
          import: 0,
          export: 587,
          netPosition: -587,
        },
        SE3: {
          import: 4492,
          export: 0,
          netPosition: 4492,
        },
        "DE-LU": {
          import: 0,
          export: 614,
          netPosition: -614,
        },
        PL: {
          import: 0,
          export: 520,
          netPosition: -520,
        },
      },
      totalExport: 2817,
      totalImport: 4492,
      totalNetPosition: 1675,
      deliveryStart: "2025-03-17T18:00:00Z",
      deliveryEnd: "2025-03-17T18:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1096,
          netPosition: -1096,
        },
        LT: {
          import: 0,
          export: 587,
          netPosition: -587,
        },
        SE3: {
          import: 4492,
          export: 0,
          netPosition: 4492,
        },
        "DE-LU": {
          import: 0,
          export: 614,
          netPosition: -614,
        },
        PL: {
          import: 0,
          export: 520,
          netPosition: -520,
        },
      },
      totalExport: 2817,
      totalImport: 4492,
      totalNetPosition: 1675,
      deliveryStart: "2025-03-17T18:15:00Z",
      deliveryEnd: "2025-03-17T18:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1096,
          netPosition: -1096,
        },
        LT: {
          import: 0,
          export: 587,
          netPosition: -587,
        },
        SE3: {
          import: 4492,
          export: 0,
          netPosition: 4492,
        },
        "DE-LU": {
          import: 0,
          export: 614,
          netPosition: -614,
        },
        PL: {
          import: 0,
          export: 520,
          netPosition: -520,
        },
      },
      totalExport: 2817,
      totalImport: 4492,
      totalNetPosition: 1675,
      deliveryStart: "2025-03-17T18:30:00Z",
      deliveryEnd: "2025-03-17T18:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1096,
          netPosition: -1096,
        },
        LT: {
          import: 0,
          export: 587,
          netPosition: -587,
        },
        SE3: {
          import: 4492,
          export: 0,
          netPosition: 4492,
        },
        "DE-LU": {
          import: 0,
          export: 614,
          netPosition: -614,
        },
        PL: {
          import: 0,
          export: 520,
          netPosition: -520,
        },
      },
      totalExport: 2817,
      totalImport: 4492,
      totalNetPosition: 1675,
      deliveryStart: "2025-03-17T18:45:00Z",
      deliveryEnd: "2025-03-17T19:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 838,
          netPosition: -838,
        },
        LT: {
          import: 0,
          export: 594,
          netPosition: -594,
        },
        SE3: {
          import: 4045,
          export: 0,
          netPosition: 4045,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2646,
      totalImport: 4045,
      totalNetPosition: 1399,
      deliveryStart: "2025-03-17T19:00:00Z",
      deliveryEnd: "2025-03-17T19:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 838,
          netPosition: -838,
        },
        LT: {
          import: 0,
          export: 594,
          netPosition: -594,
        },
        SE3: {
          import: 4045,
          export: 0,
          netPosition: 4045,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2646,
      totalImport: 4045,
      totalNetPosition: 1399,
      deliveryStart: "2025-03-17T19:15:00Z",
      deliveryEnd: "2025-03-17T19:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 838,
          netPosition: -838,
        },
        LT: {
          import: 0,
          export: 594,
          netPosition: -594,
        },
        SE3: {
          import: 4045,
          export: 0,
          netPosition: 4045,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2646,
      totalImport: 4045,
      totalNetPosition: 1399,
      deliveryStart: "2025-03-17T19:30:00Z",
      deliveryEnd: "2025-03-17T19:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 838,
          netPosition: -838,
        },
        LT: {
          import: 0,
          export: 594,
          netPosition: -594,
        },
        SE3: {
          import: 4045,
          export: 0,
          netPosition: 4045,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2646,
      totalImport: 4045,
      totalNetPosition: 1399,
      deliveryStart: "2025-03-17T19:45:00Z",
      deliveryEnd: "2025-03-17T20:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1048,
          netPosition: -1048,
        },
        LT: {
          import: 0,
          export: 491,
          netPosition: -491,
        },
        SE3: {
          import: 3945,
          export: 0,
          netPosition: 3945,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2753,
      totalImport: 3945,
      totalNetPosition: 1192,
      deliveryStart: "2025-03-17T20:00:00Z",
      deliveryEnd: "2025-03-17T20:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1048,
          netPosition: -1048,
        },
        LT: {
          import: 0,
          export: 491,
          netPosition: -491,
        },
        SE3: {
          import: 3945,
          export: 0,
          netPosition: 3945,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2753,
      totalImport: 3945,
      totalNetPosition: 1192,
      deliveryStart: "2025-03-17T20:15:00Z",
      deliveryEnd: "2025-03-17T20:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1048,
          netPosition: -1048,
        },
        LT: {
          import: 0,
          export: 491,
          netPosition: -491,
        },
        SE3: {
          import: 3945,
          export: 0,
          netPosition: 3945,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2753,
      totalImport: 3945,
      totalNetPosition: 1192,
      deliveryStart: "2025-03-17T20:30:00Z",
      deliveryEnd: "2025-03-17T20:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1048,
          netPosition: -1048,
        },
        LT: {
          import: 0,
          export: 491,
          netPosition: -491,
        },
        SE3: {
          import: 3945,
          export: 0,
          netPosition: 3945,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2753,
      totalImport: 3945,
      totalNetPosition: 1192,
      deliveryStart: "2025-03-17T20:45:00Z",
      deliveryEnd: "2025-03-17T21:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1040,
          netPosition: -1040,
        },
        LT: {
          import: 0,
          export: 278,
          netPosition: -278,
        },
        SE3: {
          import: 3634,
          export: 0,
          netPosition: 3634,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2532,
      totalImport: 3634,
      totalNetPosition: 1102,
      deliveryStart: "2025-03-17T21:00:00Z",
      deliveryEnd: "2025-03-17T21:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1040,
          netPosition: -1040,
        },
        LT: {
          import: 0,
          export: 278,
          netPosition: -278,
        },
        SE3: {
          import: 3634,
          export: 0,
          netPosition: 3634,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2532,
      totalImport: 3634,
      totalNetPosition: 1102,
      deliveryStart: "2025-03-17T21:15:00Z",
      deliveryEnd: "2025-03-17T21:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1040,
          netPosition: -1040,
        },
        LT: {
          import: 0,
          export: 278,
          netPosition: -278,
        },
        SE3: {
          import: 3634,
          export: 0,
          netPosition: 3634,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2532,
      totalImport: 3634,
      totalNetPosition: 1102,
      deliveryStart: "2025-03-17T21:30:00Z",
      deliveryEnd: "2025-03-17T21:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1040,
          netPosition: -1040,
        },
        LT: {
          import: 0,
          export: 278,
          netPosition: -278,
        },
        SE3: {
          import: 3634,
          export: 0,
          netPosition: 3634,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2532,
      totalImport: 3634,
      totalNetPosition: 1102,
      deliveryStart: "2025-03-17T21:45:00Z",
      deliveryEnd: "2025-03-17T22:00:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1068,
          netPosition: -1068,
        },
        LT: {
          import: 0,
          export: 155,
          netPosition: -155,
        },
        SE3: {
          import: 3498,
          export: 0,
          netPosition: 3498,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2437,
      totalImport: 3498,
      totalNetPosition: 1061,
      deliveryStart: "2025-03-17T22:00:00Z",
      deliveryEnd: "2025-03-17T22:15:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1068,
          netPosition: -1068,
        },
        LT: {
          import: 0,
          export: 155,
          netPosition: -155,
        },
        SE3: {
          import: 3498,
          export: 0,
          netPosition: 3498,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2437,
      totalImport: 3498,
      totalNetPosition: 1061,
      deliveryStart: "2025-03-17T22:15:00Z",
      deliveryEnd: "2025-03-17T22:30:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1068,
          netPosition: -1068,
        },
        LT: {
          import: 0,
          export: 155,
          netPosition: -155,
        },
        SE3: {
          import: 3498,
          export: 0,
          netPosition: 3498,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2437,
      totalImport: 3498,
      totalNetPosition: 1061,
      deliveryStart: "2025-03-17T22:30:00Z",
      deliveryEnd: "2025-03-17T22:45:00Z",
    },
    {
      byArea: {
        DK2: {
          import: 0,
          export: 1068,
          netPosition: -1068,
        },
        LT: {
          import: 0,
          export: 155,
          netPosition: -155,
        },
        SE3: {
          import: 3498,
          export: 0,
          netPosition: 3498,
        },
        "DE-LU": {
          import: 0,
          export: 617,
          netPosition: -617,
        },
        PL: {
          import: 0,
          export: 597,
          netPosition: -597,
        },
      },
      totalExport: 2437,
      totalImport: 3498,
      totalNetPosition: 1061,
      deliveryStart: "2025-03-17T22:45:00Z",
      deliveryEnd: "2025-03-17T23:00:00Z",
    },
  ],
  borderAreas: ["DE-LU", "DK2", "LT", "PL", "SE3"],
};

function aggregateData(data) {
  const convertToMWH = (value) => value / 4;

  const {
    totalExport,
    totalImport,
    totalNetPosition,
    totalForeignImport,
    totalForeignExport,
    totalForeignNetPosition,
    byArea,
  } = data.content.reduce(
    (acc, entry) => {
      acc.totalExport += entry.totalExport;
      acc.totalImport += entry.totalImport;
      acc.totalNetPosition += entry.totalNetPosition;

      Object.entries(entry.byArea).forEach(([area, values]) => {
        if (!acc.byArea[area]) {
          acc.byArea[area] = { import: 0, export: 0, netPosition: 0 };
        }
        acc.byArea[area].import += values.import;
        acc.byArea[area].export += values.export;
        acc.byArea[area].netPosition += values.netPosition;

        if (!NATIONAL_AREAS.has(area)) {
          acc.totalForeignImport += values.import;
          acc.totalForeignExport += values.export;
          acc.totalForeignNetPosition += values.netPosition;
        }
      });

      return acc;
    },
    {
      totalExport: 0,
      totalImport: 0,
      totalNetPosition: 0,
      totalForeignImport: 0,
      totalForeignExport: 0,
      totalForeignNetPosition: 0,
      byArea: {},
    }
  );

  return {
    totalExport: convertToMWH(totalExport),
    totalImport: convertToMWH(totalImport),
    totalNetPosition: convertToMWH(totalNetPosition),
    totalForeignImport: convertToMWH(totalForeignImport),
    totalForeignExport: convertToMWH(totalForeignExport),
    totalForeignNetPosition: convertToMWH(totalForeignNetPosition),
    byArea: Object.entries(byArea).map(({ value, label }) => {
      return { value: convertToMWH(value), label };
    }),
  };
}

app.http("getImportExport", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const importExportResult = aggregateData(mock_data);

    return { jsonBody: importExportResult };
  },
});
