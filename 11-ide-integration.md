# IDE Integration

## Supported IDEs

GitHub Copilot is available for multiple Integrated Development Environments (IDEs). Each IDE has slightly different features and configuration options.

### Officially Supported IDEs

1. **Visual Studio Code** ✅
2. **Visual Studio** ✅
3. **JetBrains IDEs** (IntelliJ IDEA, PyCharm, WebStorm, etc.) ✅
4. **Neovim** ✅
5. **Azure Data Studio** ✅

## Visual Studio Code

### Installation

**Step-by-Step:**
1. Open VS Code
2. Click Extensions icon (Ctrl/Cmd + Shift + X)
3. Search for "GitHub Copilot"
4. Click "Install" on GitHub Copilot extension
5. Optionally install "GitHub Copilot Chat" extension
6. Sign in to GitHub when prompted
7. Authorize VS Code

**Command Line:**
```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

### Configuration

**Settings.json:**
```json
{
  // Enable/disable Copilot
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "markdown": false
  },
  
  // Editor settings
  "github.copilot.editor.enableAutoCompletions": true,
  
  // Advanced settings
  "github.copilot.advanced": {
    "debug.showScores": false,
    "debug.overrideEngine": "",
    "debug.testOverrideProxyUrl": "",
    "debug.overrideProxyUrl": "",
    "authProvider": "github"
  },
  
  // Inline suggestions
  "editor.inlineSuggest.enabled": true,
  "editor.suggest.preview": true
}
```

### Keyboard Shortcuts

**Default Shortcuts:**
| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Accept Suggestion | Tab | Tab |
| Reject Suggestion | Esc | Esc |
| Next Suggestion | Alt + ] | Opt + ] |
| Previous Suggestion | Alt + [ | Opt + [ |
| Open Suggestions Panel | Ctrl + Enter | Cmd + Enter |
| Trigger Inline Suggest | Alt + \ | Opt + \ |
| Open Chat | Ctrl + Shift + I | Cmd + Shift + I |
| Inline Chat | Ctrl + I | Cmd + I |

**Custom Shortcuts (keybindings.json):**
```json
[
  {
    "key": "ctrl+shift+a",
    "command": "github.copilot.generate",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+shift+d",
    "command": "github.copilot.toggleSuggestions"
  }
]
```

### Features

**1. Inline Suggestions:**
- Real-time code completions
- Ghost text appears as you type
- Multi-line suggestions
- Context-aware

**2. Chat Panel:**
- Persistent conversation
- Code explanations
- Error debugging
- Documentation help

**3. Inline Chat:**
- Quick edits
- Refactoring
- Code improvements
- Context-based changes

**4. Status Bar:**
- Shows Copilot status
- Quick enable/disable
- Sign-in indicator

### Troubleshooting

**Copilot Not Working:**
```bash
# Check status
Ctrl/Cmd + Shift + P → "GitHub Copilot: Check Status"

# Restart Copilot
Ctrl/Cmd + Shift + P → "GitHub Copilot: Restart"

# View logs
Ctrl/Cmd + Shift + P → "GitHub Copilot: View Logs"
```

**Common Issues:**
- Not signed in → Click status bar, sign in
- Network issues → Check proxy settings
- Extension conflicts → Disable other AI extensions
- Cache issues → Reload window

## Visual Studio

### Installation

**Through Extension Manager:**
1. Open Visual Studio
2. Go to Extensions → Manage Extensions
3. Search "GitHub Copilot"
4. Download and install
5. Restart Visual Studio
6. Sign in to GitHub

**Minimum Version:**
- Visual Studio 2022 version 17.4 or later

### Configuration

**Tools → Options → GitHub Copilot:**
```
General Settings:
├── Enable Copilot: Yes/No
├── Show Inline Suggestions: Yes/No
├── Suggestion Delay: 100ms
└── Max Suggestions: 3

Language Settings:
├── C#: Enabled
├── C++: Enabled
├── JavaScript: Enabled
└── Other Languages: Configure individually

Advanced:
├── Logging Level: Information
├── Telemetry: Enabled/Disabled
└── Proxy Settings: Configure if needed
```

### Features

**1. IntelliSense Integration:**
- Works alongside IntelliSense
- Appears in completion list
- Marked with Copilot icon
- Can be filtered

**2. Copilot Chat Window:**
- Docked or floating
- Code explanations
- Error resolution
- Unit test generation

**3. Solution Explorer Integration:**
- Context from entire solution
- Understands project structure
- Works with NuGet packages

### Keyboard Shortcuts

**Default:**
| Action | Shortcut |
|--------|----------|
| Accept Suggestion | Tab |
| Next Suggestion | Alt + . |
| Previous Suggestion | Alt + , |
| Open Chat | Ctrl + / |
| Inline Chat | Alt + / |

**Customize:**
```
Tools → Options → Environment → Keyboard
Search for "GitHub.Copilot"
Assign custom shortcuts
```

## JetBrains IDEs

### Supported IDEs

- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- GoLand
- Rider
- CLion
- RubyMine
- AppCode
- DataGrip
- Android Studio

### Installation

**Through IDE:**
1. Open IDE Settings (Ctrl/Cmd + Alt + S)
2. Go to Plugins
3. Search "GitHub Copilot"
4. Click Install
5. Restart IDE
6. Sign in to GitHub

**Minimum Versions:**
- 2021.3 or later recommended
- 2021.2 minimum support

### Configuration

**Settings → Tools → GitHub Copilot:**
```
General:
├── Enable Copilot: ☑
├── Show completions automatically: ☑
├── Use proxy: Configure if needed
└── Log level: INFO

Languages:
├── Enable for all supported languages: ☑
├── Or configure per language:
    ├── Java: ☑
    ├── Python: ☑
    ├── JavaScript: ☑
    └── ...

Advanced:
├── Completion delay: 100ms
├── Maximum suggestions: 3
└── Debug mode: ☐
```

### Features

**1. Code Completion:**
- Integrated with IDE completion
- Shows in suggestion popup
- Marked with Copilot icon
- Can be sorted/filtered

**2. Chat Tool Window:**
- Accessible from side panel
- Context-aware conversations
- Code generation
- Refactoring suggestions

**3. Quick Actions:**
- Alt + Enter for suggestions
- Context menus
- Intention actions

### Keyboard Shortcuts

**Default:**
| Action | Shortcut |
|--------|----------|
| Accept | Tab |
| Next | Alt + ] |
| Previous | Alt + [ |
| Open Panel | Ctrl/Cmd + Shift + Enter |

**Customize:**
```
Settings → Keymap → GitHub Copilot
Modify as needed
```

## Neovim

### Installation

**Using vim-plug:**
```vim
" In your init.vim or .vimrc
Plug 'github/copilot.vim'

" Then run
:PlugInstall
```

**Using packer.nvim:**
```lua
-- In your plugins.lua
use 'github/copilot.vim'

-- Then run
:PackerInstall
```

**Manual Installation:**
```bash
git clone https://github.com/github/copilot.vim.git \
  ~/.config/nvim/pack/github/start/copilot.vim
```

### Setup

```vim
" In your init.vim
:Copilot setup

" Follow authentication prompts
" Enter device code at https://github.com/login/device
```

### Configuration

**Basic Configuration:**
```vim
" In init.vim or .vimrc

" Enable Copilot for specific filetypes
let g:copilot_filetypes = {
    \ '*': v:true,
    \ 'markdown': v:false,
    \ 'yaml': v:false,
    \ }

" Custom accept key
imap <silent><script><expr> <C-J> copilot#Accept("\<CR>")
let g:copilot_no_tab_map = v:true

" Disable Copilot by default
let g:copilot_enabled = v:false

" Node.js path (if not in PATH)
let g:copilot_node_command = "/path/to/node"
```

**Lua Configuration (Neovim 0.5+):**
```lua
-- In init.lua
vim.g.copilot_filetypes = {
  ["*"] = true,
  ["markdown"] = false,
  ["yaml"] = false,
}

-- Custom keybinding
vim.api.nvim_set_keymap("i", "<C-J>", 'copilot#Accept("<CR>")', 
  { silent = true, expr = true })
vim.g.copilot_no_tab_map = true
```

### Commands

```vim
" Enable/disable Copilot
:Copilot enable
:Copilot disable

" Check status
:Copilot status

" Sign out
:Copilot signout

" Open panel with suggestions
:Copilot panel

" Get version
:Copilot version
```

### Keyboard Shortcuts

**Default:**
| Action | Key |
|--------|-----|
| Accept | Tab |
| Dismiss | Ctrl + ] |
| Next | Alt + ] |
| Previous | Alt + [ |
| Open Panel | Alt + \ |

## Azure Data Studio

### Installation

1. Open Azure Data Studio
2. Click Extensions (Ctrl + Shift + X)
3. Search "GitHub Copilot"
4. Install extension
5. Reload window
6. Sign in to GitHub

### Features

- SQL query assistance
- Notebook support
- Schema understanding
- Query optimization suggestions

### Configuration

Similar to VS Code, settings in `settings.json`:
```json
{
  "github.copilot.enable": {
    "*": true,
    "sql": true,
    "notebook": true
  }
}
```

## Proxy Configuration

### VS Code

**Settings.json:**
```json
{
  "http.proxy": "http://proxy.example.com:8080",
  "http.proxyStrictSSL": false,
  "http.proxyAuthorization": "Basic base64encodedcredentials"
}
```

**Environment Variables:**
```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
export NO_PROXY=localhost,127.0.0.1
```

### JetBrains

**Settings → Appearance & Behavior → System Settings → HTTP Proxy:**
```
Manual proxy configuration:
├── Host name: proxy.example.com
├── Port number: 8080
├── Authentication: [if required]
    ├── Username: user
    └── Password: ****
└── Exceptions: localhost, 127.0.0.1
```

### Neovim

```vim
" Environment variables in shell
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

## Corporate Certificate Configuration

### VS Code

```json
{
  "http.systemCertificates": true
}
```

**Environment Variable:**
```bash
export NODE_EXTRA_CA_CERTS=/path/to/certificate.pem
```

### JetBrains

**Settings → Tools → Server Certificates:**
```
Accept non-trusted certificates automatically: ☐
Check certificate revocation: ☐
Import certificate from file: [Browse]
```

## Performance Optimization

### VS Code

**Optimize Settings:**
```json
{
  "github.copilot.editor.enableAutoCompletions": true,
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true,
    "**/build": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

### General Tips

1. **Close Unused Files**: Reduce context window
2. **Disable for Large Files**: Files > 10MB
3. **Update Extensions**: Keep Copilot updated
4. **Restart Periodically**: Clear cache
5. **Check Network**: Ensure stable connection

## Multi-IDE Workflow

**Best Practices:**
- Sign in once, works everywhere
- Settings sync per IDE
- Consistent experience
- Same account, different preferences

**Example Workflow:**
```
VS Code (Primary Development)
├── Feature development
├── Code reviews
└── Documentation

JetBrains (Java/Kotlin)
├── Android development
├── Backend services
└── Refactoring

Neovim (Quick Edits)
├── Server configuration
├── Scripts
└── Quick fixes
```

## Troubleshooting Common Issues

### Issue 1: Suggestions Not Appearing

**Check:**
```
1. Copilot enabled for file type?
2. Signed in to GitHub?
3. Network connection active?
4. Extension up to date?
5. No conflicting extensions?
```

**Solutions:**
```
- Restart IDE
- Check settings
- View logs
- Reinstall extension
```

### Issue 2: Slow Performance

**Check:**
```
1. Internet speed
2. Too many files open?
3. Large file sizes?
4. Other extensions?
```

**Solutions:**
```
- Close unnecessary files
- Increase timeout settings
- Disable for large files
- Check system resources
```

### Issue 3: Authentication Failures

**Check:**
```
1. Valid GitHub account?
2. Copilot subscription active?
3. Correct credentials?
4. Proxy settings?
```

**Solutions:**
```
- Sign out and sign in
- Check subscription status
- Clear cache
- Verify proxy settings
```

## Exam Key Points

### Must Know

1. **Supported IDEs**: VS Code, Visual Studio, JetBrains, Neovim, Azure Data Studio
2. **Installation**: Extension manager or command line
3. **Configuration**: Per-language, proxy, certificates
4. **Shortcuts**: Accept (Tab), Next (Alt+]), Open Chat
5. **Troubleshooting**: Restart, check logs, verify auth

### Common Scenarios

- "Which IDEs support Copilot?" → VS Code, VS, JetBrains, Neovim, Azure Data Studio
- "How to install?" → Through extension manager
- "Proxy configuration?" → IDE settings + environment variables
- "Not working?" → Check auth, restart, view logs
- "Best IDE?" → Depends on use case, all work well

## Next Steps

- Practice in your IDE
- Review [Best Practices](./06-best-practices.md)
- Study [Troubleshooting](./14-troubleshooting-faqs.md)
- Try [Practice Questions](./13-practice-questions.md)

---

**Pro Tip**: Master keyboard shortcuts in your primary IDE for maximum productivity!
