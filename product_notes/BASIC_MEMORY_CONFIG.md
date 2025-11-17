# Basic Memory MCP Server - Configuration Guide

## What is Basic Memory?

The Basic Memory MCP server (https://github.com/basicmachines-co/basic-memory) provides:
- Persistent memory storage across Claude Code sessions
- Ability to save important conversations
- Retrieve past context when needed
- Export conversation history

## Installation & Configuration

### Option 1: Command-line installation with data directory
```bash
claude mcp add memory -s user -- npx -y @basicmachines/basic-memory-mcp --data-dir "C:/Users/Guest1/.claude-memory"
```

### Option 2: Manual configuration in .claude.json
Add this to your mcpServers section in `~/.claude.json`:

```json
"memory": {
  "command": "npx",
  "args": ["-y", "@basicmachines/basic-memory-mcp"],
  "env": {
    "MEMORY_DIR": "C:/Users/Guest1/.claude-memory"
  }
}
```

### Option 3: Using environment variable
Set the MEMORY_DIR environment variable before starting Claude Code:
```bash
export MEMORY_DIR="C:/Users/Guest1/.claude-memory"
claude
```

## Current Status

The memory server is installed but needs configuration. It failed to connect because it doesn't know where to store data.

## How to Fix

1. Create the memory directory:
```bash
mkdir -p ~/.claude-memory
```

2. Re-add with proper configuration:
```bash
claude mcp add memory -s user -- npx -y @basicmachines/basic-memory-mcp --data-dir "C:/Users/Guest1/.claude-memory"
```

3. Restart Claude Code to apply changes

## Using Basic Memory

Once configured, you'll have access to these tools:
- **save_memory**: Save important information
- **retrieve_memory**: Search and retrieve past memories
- **list_memories**: List all stored memories
- **delete_memory**: Remove specific memories

## For Your Use Case

To document our entire conversation about the Playwright migration:
1. Configure Basic Memory properly
2. Use save_memory to store the conversation
3. Tag it with relevant keywords: "playwright", "mcp", "migration", "tennis-flyer"
4. Retrieve it anytime with retrieve_memory

This aligns with your product vision discussions with ChatGPT by creating a persistent knowledge base.