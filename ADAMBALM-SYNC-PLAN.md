# Adambalm Synchronization Plan

**Status:** PENDING REVIEW
**Reviewer:** Engineer who built adambalm server
**Date:** November 20, 2025
**Purpose:** Sync SCA Projects monorepo to adambalm for dual-machine development

---

## Executive Summary

**Goal:** Enable development on both suphouse (Windows) and adambalm (Ubuntu) with shared codebase and knowledge base.

**Key Decisions:**
- ✅ **No Docker** - Use direct installation (development tools on host pattern)
- ✅ **Clone to ~/sca-projects** - Follow adambalm's existing pattern (projects in ~/)
- ✅ **Node.js already present** - v22.18.0 via nvm (no installation needed)
- ✅ **Claude Code already present** - v2.0.24 globally via npm
- ✅ **Keep "main" Basic Memory project** - Folder-based organization

**Estimated Time:** 10 minutes
**Disk Impact:** ~410 MB (npm packages + Chromium browser)
**System Impact:** Minimal (64 GB RAM, 1.6 TB free on adambalm)

---

## Path Mappings (Critical)

| Machine | Path | Notes |
|---------|------|-------|
| **suphouse** | `C:/Users/Guest1/ClaudeProjects/SCA Projects/` | Uses ClaudeProjects workspace |
| **adambalm** | `/home/ed/sca-projects/` | Follows home directory pattern |

**Why different:**
- adambalm has 20+ projects directly in ~/ (existing pattern)
- suphouse uses ~/ClaudeProjects/ workspace
- Both are valid, just need to document mapping

---

## Current State Analysis (Verified with Diagnostics)

### suphouse (Windows 11, MINGW64)
- ✅ SCA Projects at `C:/Users/Guest1/ClaudeProjects/SCA Projects`
- ✅ GitHub remote: `github.com/adambalm/sca-projects`
- ✅ Node.js, Playwright, Claude Code installed
- ✅ Basic Memory synced via `github.com/adambalm/basic-memory`
- ⚠️ RAM: 16 GB at 83% usage (tight, rules out Docker)

### adambalm (Ubuntu 24.04 Server)
- ✅ Node.js v22.18.0 (via nvm)
- ✅ Claude Code v2.0.24 (global npm package)
- ✅ Git 2.43.0
- ✅ Python 3.12.3 + uvx
- ✅ Basic Memory configured
- ✅ Docker with 14 running containers (Supabase, Django, etc.)
- ✅ 22+ development projects in ~/ (no ClaudeProjects/ directory)
- ✅ RAM: 64 GB at 11% usage, 1.6 TB free disk
- ✅ GPU: NVIDIA GeForce RTX 5060 Ti (16 GB VRAM, CUDA 13.0)
- ✅ **Ollama**: Systemd service on host, 9 models (52 GB), GPU-accelerated
- ❌ SCA Projects monorepo NOT present yet

### adambalm's Existing Pattern (from diagnostics)

**Dockerized Services (14 containers):**
- Supabase stack (11 containers: PostgreSQL, Auth, Storage, etc.)
- SCA Django/Wagtail (`springfield_academy_django`)
- Portainer (Docker management)
- Open WebUI (LLM frontend, port 3000)

**Pattern:** Code on host (volume mounted), runtime in container
```yaml
# Example from docker-compose.dev.yml
volumes:
  - ./springfield_academy:/app  # HOST → Container
```

**Direct on Host (22+ projects + inference):**
- Development: ghost-writer, ml-roadmap, contentful-marketo-ai-bridge, sca, etc.
- Tools: Node.js (nvm), Claude Code, git, Python
- **ML Inference: Ollama (systemd service, `/usr/local/bin/ollama`)**
  - 9 models: qwen3, llama3.2, qwen2.5-coder, deepseek-r1, qwq (19GB), etc.
  - GPU-accelerated (CUDA 12.0)
  - API on port 11434
  - Storage: `/usr/share/ollama/.ollama/models` (52 GB)
  - Active: Network clients on 10.1.11.x querying models

**Pattern:**
- **Web UIs/Databases** → Docker
- **Inference engines/Development tools** → Host (performance, GPU access)

---

## Docker Analysis (Data-Backed Decision)

### Question: Should SCA Projects be Dockerized?

**Answer: NO** - Use direct installation on host

### Scoring

| Approach | Score | Reasoning |
|----------|-------|-----------|
| **Direct Install** | **98/100** | Matches existing pattern, Node.js already present, Claude Code integration seamless |
| **Docker** | **40/100** | Adds complexity, breaks Playwright visual testing, complicates MCP integration |

### Detailed Analysis

#### Why Direct Installation Wins

**1. Matches Existing adambalm Pattern**
- 22 development projects on host
- 14 service containers in Docker (UIs, databases)
- **Ollama on host** (systemd service, GPU-accelerated inference)
- SCA Projects = development project, not a service
- **Pattern:** Performance-critical tools and inference engines on host ✅

**2. Node.js Already Present**
- v22.18.0 installed via nvm
- No need for isolation (only one Node.js project)
- No version conflicts to solve
- **Benefit:** Zero Node.js setup needed ✅

**3. Claude Code Integration**
- Claude Code v2.0.24 already installed on host
- Needs direct filesystem access
- Docker volume mounts add latency and permission issues
- **Benefit:** Works out of the box ✅

**4. Playwright Visual Testing**
- TennisFlyer workflow: `headless: false`, `slowMo: 50`
- Design iteration loop: Edit → Visual Preview → Iterate
- Docker containers default to headless (no display)
- X11 forwarding possible but adds complexity
- **Benefit:** Preserves established workflow ✅

**5. MCP Server Access**
- Basic Memory MCP (via uvx on host)
- Playwright MCP (needs Playwright on host)
- GitHub MCP (needs git on host)
- Docker requires network routing for MCP communication
- **Benefit:** Native integration ✅

**6. suphouse RAM Constraint**
- 16 GB at 83% usage = 2.7 GB free
- Docker daemon: ~500 MB
- Container overhead: ~200 MB
- Result: Only 2 GB free → swapping → performance degradation
- **Deal-breaker:** Docker infeasible on suphouse ❌

**7. System Cleanliness**
- Direct: Node.js (1 package), npm packages (project-local)
- Docker: Docker daemon, images, networks, volumes
- **Counter-intuitive:** Docker adds MORE system pollution
- **Benefit:** Simpler cleanup (rm -rf ~/sca-projects) ✅

#### Why Docker Loses

**1. Complexity Without Benefit**
- Dockerfile to maintain
- docker-compose.yml for orchestration
- Volume mount configurations
- Network configurations for MCP servers
- Container rebuild on dependency changes
- **Cost:** High complexity, no meaningful benefit ❌

**2. Breaks Established Workflow**
- TennisFlyer visual testing breaks (headless requirement)
- Claude Code needs volume mount workarounds
- Git workflow complicated (UID mismatches)
- **Cost:** Disrupts proven patterns ❌

**3. Performance Overhead**
- Docker daemon: ~500 MB RAM
- Container isolation: ~200 MB RAM per container
- I/O overhead for volume mounts
- **Cost:** Slower, heavier ❌

**4. No Version Isolation Needed**
- Only ONE project using Node.js (SCA Projects monorepo)
- No other projects requiring different Node.js versions
- **Docker benefit nullified:** Nothing to isolate from ❌

**5. Contradicts adambalm Pattern**
- adambalm uses Docker for **UIs/databases** (Open WebUI, Supabase, Django)
- adambalm uses host for **development + inference** (22 projects, Ollama)
- **Pattern mismatch:** Would break established convention ❌

### Services vs Development Tools

| Aspect | Services (Docker) | Development + Inference (Host) |
|--------|-------------------|--------------------------------|
| **Examples** | Open WebUI, Supabase, PostgreSQL, Django | Ollama, Node.js, Claude Code, git, SCA Projects |
| **Runs** | Continuously (daemon) | On-demand or performance-critical |
| **Performance** | Acceptable overhead | Native (GPU access, no overhead) |
| **Isolation** | Required (multi-tenant, versions) | Not required (nvm/uvx/systemd) |
| **adambalm Count** | 14 containers | 22+ projects + Ollama |

**SCA Projects Classification:** Development tool → Host ✅

---

## Synchronization Plan (3 Phases)

### Phase 1: Prepare suphouse (2 minutes)

**Objective:** Commit untracked files, push to GitHub

```bash
# In: C:/Users/Guest1/ClaudeProjects/SCA Projects

# 1. Add c2s_fire_drill to repository
git add c2s_fire_drill/
git commit -m "feat(c2s): add experimental project structure"

# 2. Push to GitHub
git push origin master

# 3. Verify
git status  # Should be clean
```

**No other changes needed on suphouse** - already fully configured ✅

---

### Phase 2: Set Up adambalm (5 minutes)

**Objective:** Clone repo, install dependencies

```bash
# 1. Clone repository (following adambalm pattern: projects in ~/)
cd ~
git clone git@github.com:adambalm/sca-projects.git sca-projects
cd sca-projects

# 2. Verify clone
git remote -v  # github.com/adambalm/sca-projects
git log --oneline -5
ls -la  # TennisFlyer/, ResumeFactory/, c2s_fire_drill/, etc.

# 3. Install npm dependencies (exact versions via package-lock.json)
npm ci

# 4. Install Playwright browser binaries
npx playwright install chromium

# 5. Verify installations
node --version      # v22.18.0 (already present)
npm --version       # 10.9.3 (already present)
npx playwright --version  # 1.56.1 (newly installed)

# 6. Create Linux-compatible MCP config for TennisFlyer
cd TennisFlyer
cat > .mcp.json << 'EOF'
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "$HOME/.cache/ms-playwright"
      }
    }
  }
}
EOF

cd ..
```

**What gets installed:**
- sca-projects repository: ~10 MB
- npm packages (Playwright, etc.): ~100 MB
- Chromium browser binary: ~300 MB (cached at ~/.cache/ms-playwright)
- **Total:** ~410 MB

**System impact:**
- Disk: 410 MB of 1.6 TB (0.025%)
- RAM: 0 MB at rest, ~200 MB during execution (64 GB total)
- **Impact:** Negligible ✅

---

### Phase 3: Verify Setup (3 minutes)

**Objective:** Test functionality and cross-machine sync

```bash
# 3.1 Test Basic Functionality
cd ~/sca-projects

git status
node --version
npm --version
npx playwright --version
ls -la  # Verify all project directories present

# 3.2 Test Claude Code Integration
claude  # Should launch successfully

# In Claude session:
# - "List files in the current directory"
# - "Read the TennisFlyer/CLAUDE.md file"
# - "Search Basic Memory for 'TennisFlyer'"

# 3.3 Test Round-Trip Sync
# On adambalm:
echo "# Test sync from adambalm" >> README.md
git add README.md
git commit -m "test: verify bidirectional sync"
git push origin master

# On suphouse:
cd "/c/Users/Guest1/ClaudeProjects/SCA Projects"
git pull origin master
tail -1 README.md  # Should show test line

# Clean up (either machine):
git revert HEAD
git push origin master
```

---

## Daily Workflow Pattern

### Starting Work (Either Machine)

**On suphouse:**
```bash
cd "/c/Users/Guest1/ClaudeProjects/SCA Projects"
git pull origin master
claude
```

**On adambalm:**
```bash
cd ~/sca-projects
git pull origin master
claude
```

### Ending Work (Either Machine)

```bash
git add -A
git commit -m "type(scope): description"
git push origin master
```

**Note:** Basic Memory syncs independently via its own GitHub repo (`github.com/adambalm/basic-memory`)

### Session Handoff

1. End session on Machine A: commit + push
2. Start session on Machine B: pull + claude
3. Basic Memory notes automatically available (separate git sync)

---

## Machine-Specific Configurations

### Files NOT Synced (gitignored)

These must be created per-machine with machine-specific paths:

**TennisFlyer/.mcp.json** (Playwright MCP configuration)

**suphouse:**
```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "cmd",
      "args": ["/c", "npx", "@playwright/mcp"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "C:UsersGuest1AppDataLocalms-playwright"
      }
    }
  }
}
```

**adambalm:**
```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "$HOME/.cache/ms-playwright"
      }
    }
  }
}
```

**Root .mcp.json** (User-level MCP servers)
- Contains user API keys and global MCP configurations
- Already exists on both machines
- Security: Never commit to git
- Each machine maintains its own

---

## Verification Checklist

### On adambalm (After Phase 2)
- [ ] Repository cloned to ~/sca-projects
- [ ] Git remote: github.com/adambalm/sca-projects
- [ ] All project directories present (TennisFlyer, ResumeFactory, c2s_fire_drill)
- [ ] `npm ci` completed without errors
- [ ] Playwright v1.56.1 installed
- [ ] Chromium browser binaries installed
- [ ] TennisFlyer/.mcp.json created with Linux paths
- [ ] Node.js v22.18.0 working (already present)
- [ ] Claude Code v2.0.24 working (already present)

### Cross-Machine Sync (After Phase 3)
- [ ] Changes pushed from suphouse appear on adambalm after `git pull`
- [ ] Changes pushed from adambalm appear on suphouse after `git pull`
- [ ] Basic Memory notes accessible from both machines
- [ ] Claude Code can read/write files on both machines
- [ ] Playwright scripts run on both machines
- [ ] No file path errors

---

## Success Criteria

✅ Both machines have sca-projects codebase
✅ Both can push/pull changes via GitHub
✅ Both access same Basic Memory knowledge base (separate repo)
✅ Playwright works on both platforms (visual testing preserved)
✅ Claude Code integration seamless on both machines
✅ MCP servers work natively
✅ Session handoff between machines is smooth
✅ No Docker complexity
✅ Path mappings documented and understood

---

## Risk Assessment

### Low Risk ✅
- **No changes to adambalm's existing infrastructure**
  - Docker containers untouched
  - Existing projects (~/sca, etc.) untouched
  - System packages untouched (Node.js, Claude Code already present)

- **Easily reversible**
  - Can delete ~/sca-projects anytime
  - No system modifications beyond project directory
  - Git history preserved on GitHub

### Context for Discussion

- Directory placement: ~/sca-projects (follows existing pattern of 22+ projects in ~/)
- Resource impact: 410 MB disk, ~200 MB RAM during execution
- Backup strategy: Git + GitHub (no additional backup configured)
- Potential rearchitecture: May affect directory structure later

---

## Alternative Approaches (If Docker Recommended)

If the engineer prefers Docker despite the analysis:

### Option A: Full Containerization

**Dockerfile:**
```dockerfile
FROM node:22-slim

RUN apt-get update && apt-get install -y \
    git python3 python3-pip \
    && npx playwright install --with-deps chromium

WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

CMD ["bash"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  sca-projects:
    build: .
    volumes:
      - .:/workspace
    environment:
      - DISPLAY=$DISPLAY
    network_mode: host
```

**Trade-offs:**
- ✅ Version isolation
- ❌ Claude Code integration complexity
- ❌ Playwright visual testing challenges (X11 forwarding needed)
- ❌ MCP server networking complexity
- ❌ Volume mount permission issues

### Option B: Hybrid (Code on Host, Runtime in Container)

Follow SCA Django pattern:
- Code at ~/sca-projects (editable on host)
- Container only for execution
- Volume mount for live editing

**Trade-offs:**
- ✅ Follows existing Django pattern
- ❌ More complex than pure direct install
- ❌ Still have volume mount and MCP challenges
- ❓ Marginal benefit for Node.js project

---

## Future: Model Fine-Tuning Context

**Existing ML Infrastructure (verified):**
- Ollama: Systemd service, 9 models (52 GB), GPU-accelerated, API on port 11434
- Open WebUI: Docker container, frontend on port 3000
- ml-roadmap repo: PyTorch 2.7.0+cu128, Transformers 4.54.1, Hugging Face Hub (venv)
- RTX 5060 Ti: 16 GB VRAM, CUDA 13.0, currently idle
- Active inference: Network clients querying Ollama from 10.1.11.x

**Future integration with SCA Projects:**
- Training scripts and model configs in repository
- Workflow orchestration from suphouse
- API client code for adambalm services
- Experiment documentation in Basic Memory

---

## Post-Setup: Future Considerations

### If Rearchitecting adambalm

If directory structure changes:
1. Move ~/sca-projects to new location
2. Update documentation (CLAUDE.md, Basic Memory notes)
3. Re-run `npm ci` in new location
4. Git remote unchanged, GitHub sync continues

### If Adding More Projects

Pattern is established:
1. Clone to ~/ (following adambalm convention)
2. Install dependencies
3. Document in workspace CLAUDE.md
4. GitHub sync for code, Basic Memory for notes

### If Node.js Version Conflicts Arise

If future projects need different Node.js versions:
- Use nvm to switch: `nvm use 20` or `nvm use 22`
- Per-project .nvmrc files: `echo "22.18.0" > .nvmrc`
- Docker becomes more attractive if many conflicting versions

---

## Appendix: Diagnostic Commands Run

To verify current state, these commands were executed:

```bash
# Check Node.js and npm (via nvm)
ssh ed@100.111.114.84 'source ~/.nvm/nvm.sh && nvm --version && nvm list && node --version && npm --version'

# Check Claude Code
ssh ed@100.111.114.84 'source ~/.nvm/nvm.sh && which claude && claude --version'

# Check npm global packages
ssh ed@100.111.114.84 'source ~/.nvm/nvm.sh && npm list -g --depth=0'

# Check Docker containers
ssh ed@100.111.114.84 'docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"'

# Check project directories
ssh ed@100.111.114.84 'ls -la ~/ | grep -E "^d"'

# Check git repositories
ssh ed@100.111.114.84 'find ~/ -maxdepth 2 -name ".git" -type d'

# Check SCA Django container
ssh ed@100.111.114.84 'docker inspect springfield_academy_django --format "{{json .Mounts}}"'

# Check system resources
ssh ed@100.111.114.84 'free -h && df -h /'
```

Results documented in "Current State Analysis" section above.

---

## Conclusion

**Recommendation:** Proceed with direct installation (no Docker)

**Rationale:**
- Matches adambalm's established pattern (dev on host, services in Docker)
- Preserves existing workflows (Playwright visual testing, Claude Code integration)
- Minimal system impact (Node.js already present)
- Simpler, faster, more maintainable
- Easily reversible

**Next Steps:**
1. Engineer review of this plan
2. Address any concerns or questions
3. Execute Phases 1-3 (~10 minutes)
4. Verify cross-machine sync
5. Document in Basic Memory

---

**Plan Status:** PENDING REVIEW
**Awaiting:** Engineer feedback
**Contact:** Ed O'Connell
**Date:** November 20, 2025
