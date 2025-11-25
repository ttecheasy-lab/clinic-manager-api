import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { DnsInstrumentation } from "@opentelemetry/instrumentation-dns";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { env } from "./env";

export const traceExporter = new OTLPTraceExporter({
	url: "http://localhost:4318/v1/traces",
});

let sdk: NodeSDK;

if (["dev", "production"].includes(env.NODE_ENV)) {
	sdk = new NodeSDK({
		traceExporter,
		instrumentations: [new PgInstrumentation(), new DnsInstrumentation()],
	});
	sdk.start();

	process.on("SIGTERM", () => {
		sdk
			?.shutdown()
			.then(() => console.log("Tracing terminated"))
			.catch(error => console.log("Error terminating tracing", error))
			.finally(() => process.exit(0));
	});
}
