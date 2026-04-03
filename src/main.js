/**
 * Command router and output formatter.
 *
 * This file wires your client to the GitHub Actions runtime. It:
 *   1. Reads the `command` input to determine which operation to run
 *   2. Creates your client with the provided credentials
 *   3. Calls the appropriate handler function
 *   4. Sets the `result` output as a JSON string
 *   5. Writes a job summary for visibility in the Actions UI
 *   6. Reports errors cleanly via handleError()
 *
 * To add a new command:
 *   1. Write a handler function (async, returns result)
 *   2. Add it to the commands passed to createCommandRouter()
 */

import * as core from '@actions/core'
import { createCommandRouter, setJsonOutput, writeSummary } from '@w3-io/action-core'
// TODO: Update this import to match your renamed client
import { Client } from './client.js'

// TODO: Update constructor args to match your client.
// Remove apiKey if your API doesn't need auth.
function getClient() {
  return new Client({
    apiKey: core.getInput('api-key', { required: true }),
    baseUrl: core.getInput('api-url') || undefined,
  })
}

// TODO: Replace with your commands. Each key is a command name that users
// pass via the `command` input. Each value is an async function that
// creates the client, calls the operation, sets outputs, and writes a summary.
const router = createCommandRouter({
  'example-command': async () => {
    const client = getClient()
    // TODO: Read your command-specific inputs here
    const input = core.getInput('input', { required: true })

    const result = await client.exampleCommand(input)
    setJsonOutput('result', result)

    // TODO: Customize the summary for your action.
    // Key-value pairs work well for most commands:
    //   await writeSummary('My Action: command', [['Key', 'value'], ['TX', '`0x...`']])
    // Or pass an object for a JSON code block:
    //   await writeSummary('My Action: command', result)
    await writeSummary('Action Result', result)
  },

  // 'another-command': async () => { ... },
})

export function run() {
  router()
}
