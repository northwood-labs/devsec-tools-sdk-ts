# DevSecTools SDK for TypeScript

**Experimental. Untested. Not ready for primetime. Exploring code generation.**

## Overview

A TypeScript/JavaScript SDK for interacting with the [DevSecTools API].

This client provides an easy way to interact with the [DevSecTools API], which scans websites for security-related information such as HTTP version support and TLS configurations.

* ✅ Requires [TypeScript] 5.8+.
* ✅ Uses [fetch()] to handle HTTP requests and supports [async]/[await].
* ✅ Fully-typed; ensures strong IDE support with proper type hints and [TSDoc] docblocks.

## Model

* [openapi.json](https://github.com/northwood-labs/devsec-tools/raw/refs/heads/main/openapi.json)

## Usage

### Instantiating with default configuration

```typescript
import { Client } from "@northwood-labs/devsec-tools-sdk";

const client = new Client();
```

### Custom configuration

<details>
<summary>See example…</summary>

```typescript
import { Client, ENDPOINT } from "@northwood-labs/devsec-tools-sdk";

// Using a known endpoint (strictly typed)
const client = new Client({
  baseUrl: ENDPOINT.LOCALDEV,
  timeoutSeconds: 10,
});

// Using a custom API endpoint (still allowed)
const customClient = new Client({
  baseUrl: "https://custom-endpoint.com",
  timeoutSeconds: 15,
});
```

</details>

### Updating configuration at runtime

<details>
<summary>See example…</summary>

```typescript
import { Client, ENDPOINT } from "@northwood-labs/devsec-tools-sdk";

const client = new Client();

client.setBaseUrl(ENDPOINT.LOCALDEV);
client.setTimeoutSeconds(15);
```

</details>

### Making single requests

<details>
<summary>See example…</summary>

```typescript
import { Client, ENDPOINT } from "@northwood-labs/devsec-tools-sdk";

async function run() {
  const client = new Client();

  try {
    const results = await client.http("example.com");
    console.log("Results:", results);
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}

run();
```

</details>

### Making parallel/batch requests

<details>
<summary>See example…</summary>

```typescript
import { Client, ENDPOINT } from "@northwood-labs/devsec-tools-sdk";

async function run() {
  const client = new Client();

  try {
    const results = await client.batchRequests([
      { method: "http", url: "apple.com"  },
      { method: "tls",  url: "google.com" }
    ]);

    console.log("Batch Results:", results);
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}

run();
```

</details>

[async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[DevSecTools API]: https://devsec.tools
[fetch()]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[TSDoc]: https://tsdoc.org
[TypeScript]: https://www.typescriptlang.org
