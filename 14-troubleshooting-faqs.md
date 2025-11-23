# Troubleshooting and FAQs

## Common Issues and Solutions

### Installation and Setup Issues

#### Issue 1: Extension Not Installing

**Symptoms:**
- Extension installation fails
- Error message during installation
- Extension doesn't appear in IDE

**Solutions:**
```
1. Check IDE version compatibility
   - VS Code: Latest version recommended
   - Visual Studio: 2022 version 17.4+
   - JetBrains: 2021.3+

2. Check internet connection
   - Verify access to GitHub servers
   - Test: ping github.com

3. Clear extension cache
   - VS Code: Delete %USERPROFILE%\.vscode\extensions (Windows)
   - Mac/Linux: Delete ~/.vscode/extensions

4. Try manual installation
   - Download .vsix file
   - Install from file: Extensions > ... > Install from VSIX
```

#### Issue 2: Authentication Failures

**Symptoms:**
- Cannot sign in to GitHub
- "Not authenticated" error
- Sign-in loop

**Solutions:**
```
1. Verify GitHub account has Copilot subscription
   - Check: github.com/settings/copilot

2. Clear authentication cache
   - VS Code: Ctrl/Cmd+Shift+P > "GitHub Copilot: Sign Out"
   - Sign in again

3. Check GitHub credentials
   - Ensure 2FA is set up correctly
   - Try signing in to GitHub.com first

4. Browser issues
   - Use default browser for authentication
   - Clear browser cache
   - Try different browser

5. Corporate network
   - Check if GitHub is blocked
   - Configure proxy settings
   - Verify firewall rules
```

### Suggestion Issues

#### Issue 3: No Suggestions Appearing

**Symptoms:**
- Copilot not showing suggestions
- Ghost text not appearing
- Status shows "Not working"

**Diagnostic Steps:**
```
1. Check Copilot status
   - Click Copilot icon in status bar
   - Should show "Ready"

2. Verify file type support
   - Check if language is supported
   - Some file types may be disabled

3. Check settings
   - Ensure Copilot is enabled
   - Check language-specific settings

4. Verify context
   - Ensure there's enough context
   - Try adding comments

5. Check network
   - Verify internet connection
   - Test other online features
```

**Solutions:**
```
✅ Solution 1: Restart Copilot
   Ctrl/Cmd+Shift+P > "GitHub Copilot: Restart"

✅ Solution 2: Check language settings
   {
     "github.copilot.enable": {
       "*": true,
       "yaml": false  // May be disabled
     }
   }

✅ Solution 3: Restart IDE
   Close and reopen your IDE

✅ Solution 4: Re-authenticate
   Sign out and sign in again

✅ Solution 5: Check firewall/proxy
   Ensure access to:
   - *.github.com
   - *.githubusercontent.com
   - api.githubcopilot.com
```

#### Issue 4: Poor Quality Suggestions

**Symptoms:**
- Irrelevant suggestions
- Incorrect code
- Suggestions don't match context

**Solutions:**
```
✅ Provide better context
   # Bad:
   # function
   
   # Good:
   # Create async function to fetch user data from API
   # with error handling and retry logic

✅ Use type hints
   def process_data(items: list[dict]) -> pd.DataFrame:

✅ Add imports
   import pandas as pd
   import numpy as np

✅ Write descriptive names
   # Bad: def f(x, y)
   # Good: def calculate_shipping_cost(order_total, weight)

✅ Include examples
   # Example input: {"name": "John", "age": 30}
   # Example output: "John (30 years old)"
```

#### Issue 5: Slow Suggestions

**Symptoms:**
- Long delay before suggestions appear
- Laggy IDE performance
- Timeout errors

**Solutions:**
```
1. Check internet speed
   - Run speed test
   - Verify stable connection
   - Consider upgrading internet

2. Reduce context size
   - Close unnecessary files
   - Limit open tabs
   - Split large files

3. Optimize IDE
   - Close other extensions temporarily
   - Increase memory allocation
   - Update IDE to latest version

4. Check system resources
   - Monitor CPU/RAM usage
   - Close unnecessary applications
   - Restart computer

5. Configure timeout
   {
     "github.copilot.advanced": {
       "timeout": 5000  // milliseconds
     }
   }
```

### Chat Issues

#### Issue 6: Chat Not Responding

**Symptoms:**
- Chat window opens but no response
- "Error" message in chat
- Chat freezes

**Solutions:**
```
✅ Clear chat history
   Use /clear command

✅ Restart chat extension
   Reload IDE window

✅ Check for updates
   Update Copilot Chat extension

✅ Verify network
   Test connection to GitHub

✅ Try different prompt
   Simplify or rephrase question
```

#### Issue 7: Chat Gives Incorrect Information

**Symptoms:**
- Wrong explanations
- Incorrect code suggestions
- Outdated information

**Solutions:**
```
✅ Provide more context
   "In this React 18 component using TypeScript..."

✅ Be more specific
   Instead of: "How to do auth?"
   Try: "How to implement JWT authentication in Express.js?"

✅ Break down complex questions
   Ask one thing at a time

✅ Verify information
   Always verify critical information
   Check official documentation

✅ Report issues
   Use feedback mechanism to report errors
```

### Enterprise and Administration Issues

#### Issue 8: Users Can't Access Copilot

**Symptoms:**
- Seats available but users can't activate
- "No subscription" error
- Permissions denied

**Solutions:**
```
1. Verify seat assignment
   - Check organization settings
   - Ensure user is assigned a seat
   - Verify user is in correct team

2. Check organization policies
   - Ensure Copilot is enabled
   - Verify user has access permission
   - Check repository restrictions

3. User re-authentication
   - Have user sign out and sign in
   - Clear credentials
   - Authorize Copilot access

4. Wait for propagation
   - Changes may take 5-10 minutes
   - Have user restart IDE

5. Check license count
   - Verify seats available
   - Check if limit reached
```

#### Issue 9: Content Exclusions Not Working

**Symptoms:**
- Excluded files still showing suggestions
- Patterns not being matched
- Exclusions not applying

**Solutions:**
```
✅ Check pattern syntax
   # Correct patterns:
   secrets/**/*
   *.key
   .env*
   **/credentials/**

✅ Verify save and apply
   - Save exclusion settings
   - Wait for propagation (up to 30 minutes)
   - Restart IDE

✅ Test pattern matching
   - Use path pattern tester
   - Verify glob pattern syntax
   - Check for typos

✅ Check hierarchy
   - Organization-level exclusions
   - Repository-level exclusions
   - User-level settings

✅ Clear cache
   - Restart IDE after applying
   - Clear Copilot cache
```

#### Issue 10: Audit Logs Not Showing Events

**Symptoms:**
- Missing events in audit logs
- Incomplete data
- Old data not visible

**Solutions:**
```
1. Check time range
   - Default shows last 90 days
   - Adjust date filters

2. Verify event types
   - Use correct event filters
   - phrase=action:copilot

3. Check permissions
   - Requires organization owner role
   - Verify admin access

4. API access
   - For older data, use API
   - Export and archive logs

5. Wait for indexing
   - New events may take minutes to appear
   - Refresh page
```

### Network and Proxy Issues

#### Issue 11: Corporate Proxy Blocking Copilot

**Symptoms:**
- Connection timeout
- Cannot reach GitHub servers
- Proxy authentication failures

**Solutions:**
```
✅ Configure proxy in IDE
   VS Code settings.json:
   {
     "http.proxy": "http://proxy.company.com:8080",
     "http.proxyStrictSSL": false,
     "http.proxyAuthorization": "Basic <base64>"
   }

✅ Set environment variables
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=http://proxy.company.com:8080
   export NO_PROXY=localhost,127.0.0.1

✅ Configure proxy authentication
   - Use PAC file if available
   - Set credentials in proxy settings
   - Use NTLM if required

✅ Whitelist endpoints
   *.github.com
   *.githubusercontent.com
   api.githubcopilot.com
   copilot-proxy.githubusercontent.com
```

#### Issue 12: SSL Certificate Errors

**Symptoms:**
- "Certificate verification failed"
- "SSL error"
- "Unable to verify certificate"

**Solutions:**
```
✅ Trust corporate certificate
   VS Code:
   {
     "http.systemCertificates": true
   }

✅ Add certificate to system
   Windows:
   - Install .cer file in Trusted Root
   
   Mac:
   - Add to Keychain Access
   
   Linux:
   - Add to /etc/ssl/certs/

✅ Use NODE_EXTRA_CA_CERTS
   export NODE_EXTRA_CA_CERTS=/path/to/cert.pem

✅ Temporary bypass (not recommended)
   {
     "http.proxyStrictSSL": false
   }
```

## Frequently Asked Questions (FAQs)

### General Questions

**Q1: Is GitHub Copilot free?**

A: No, GitHub Copilot requires a paid subscription:
- Individual: $10/month or $100/year
- Business: $19/user/month
- Enterprise: $39/user/month
- Exception: Free for verified students and open source maintainers

**Q2: Can I use Copilot offline?**

A: No, GitHub Copilot requires an internet connection to function. It sends context to GitHub's servers and receives suggestions back.

**Q3: Does Copilot work with all programming languages?**

A: Copilot supports many languages, with best support for popular ones like Python, JavaScript, TypeScript, Java, Go, and C#. Less common languages have limited support.

**Q4: Can I use Copilot on multiple computers?**

A: Yes, one subscription works across all your devices. Just sign in with the same GitHub account.

**Q5: Does Copilot replace developers?**

A: No, Copilot is a tool to assist developers, not replace them. It helps with boilerplate, suggestions, and learning, but requires human oversight and decision-making.

### Privacy and Security

**Q6: Is my code used to train Copilot?**

A: 
- Individual: Public code may be used (you can opt out of telemetry)
- Business/Enterprise: Private code is NOT used for training

**Q7: Can other users see my code?**

A: No, your code is not shared with other users. Suggestions are generated based on public code patterns, not your private code.

**Q8: How secure is Copilot?**

A: Very secure:
- All transmissions encrypted (HTTPS/TLS)
- SOC 2 Type II certified
- Compliance with GDPR, HIPAA-eligible
- Regular security audits

**Q9: What if Copilot suggests copyrighted code?**

A: Copilot has duplicate detection features. Enable public code filtering to block or warn about suggestions that match public code.

**Q10: Should I review all Copilot suggestions?**

A: Yes, absolutely. Always review for:
- Correctness
- Security vulnerabilities
- Performance
- Code quality
- Licensing concerns

### Features and Functionality

**Q11: What's the difference between Copilot and Copilot Chat?**

A: 
- Copilot: Inline code suggestions as you type
- Copilot Chat: Conversational AI for questions, explanations, and complex tasks

**Q12: Can Copilot access my entire codebase?**

A: 
- IDE: Only context window (~8,000 tokens) and open files
- Enterprise @workspace: Can search across workspace
- Never sends entire repository

**Q13: How do I get better suggestions?**

A: 
- Write clear, descriptive comments
- Use type hints and interfaces
- Include proper imports
- Provide examples
- Use descriptive variable names

**Q14: Can Copilot execute code?**

A: No, Copilot only generates code suggestions. It cannot execute code, access files, or make changes without your approval.

**Q15: Does Copilot work in the terminal?**

A: Yes, there's a GitHub Copilot CLI that provides command-line suggestions and explanations.

### Billing and Subscription

**Q16: Can I cancel anytime?**

A: Yes, subscriptions can be cancelled at any time. You'll have access until the end of your billing period.

**Q17: Is there a free trial?**

A: GitHub sometimes offers free trials. Check github.com/features/copilot for current promotions.

**Q18: What happens if I don't pay?**

A: Copilot will stop working once the subscription expires. Your code remains yours.

**Q19: Can I switch between tiers?**

A: Yes, you can upgrade or downgrade. Changes take effect at the next billing cycle.

**Q20: Do I need a GitHub account?**

A: Yes, a GitHub account is required to use Copilot.

### Troubleshooting

**Q21: Why isn't Copilot working in my IDE?**

A: Check:
1. Signed in to GitHub?
2. Active subscription?
3. Extension installed and enabled?
4. Supported IDE version?
5. Internet connection working?

**Q22: Copilot is slow, how to fix?**

A: 
- Close unnecessary files
- Check internet speed
- Restart IDE
- Update extension
- Reduce open tabs

**Q23: Can I disable Copilot for specific files?**

A: Yes:
```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": false,
    "plaintext": false
  }
}
```

**Q24: How do I report a bug?**

A: 
- In IDE: Help > Report Issue
- GitHub: github.com/community
- Include: OS, IDE version, Copilot version, error logs

**Q25: Where can I view logs?**

A: 
- VS Code: Ctrl/Cmd+Shift+P > "GitHub Copilot: View Logs"
- Output panel: Select "GitHub Copilot" channel

### Enterprise

**Q26: How many seats do I need?**

A: One seat per active user. Buy enough seats for concurrent users, not total employees.

**Q27: Can I get a volume discount?**

A: Contact GitHub Sales for enterprise agreements and volume pricing.

**Q28: How do I manage user access?**

A: Through GitHub organization settings:
- Settings > Copilot
- Manage seats
- Assign to teams or users

**Q29: Can we use Copilot with our internal code?**

A: Yes, Enterprise tier includes knowledge bases that can index internal repositories.

**Q30: Is Copilot HIPAA compliant?**

A: GitHub Copilot can be part of a HIPAA-compliant workflow, but you need proper BAA and configuration.

## Quick Troubleshooting Checklist

```
Issue: Copilot not working

□ Signed in to GitHub?
□ Active subscription?
□ Extension installed?
□ Extension enabled?
□ Supported file type?
□ Internet connection?
□ IDE up to date?
□ Extension up to date?
□ Firewall allowing access?
□ Proxy configured correctly?

If all checked and still not working:
1. Restart Copilot
2. Restart IDE
3. Reinstall extension
4. Check GitHub status page
5. Contact support
```

## Getting Help

### Support Channels

**Community Support:**
- GitHub Community Discussions
- Stack Overflow (tag: github-copilot)
- Reddit: r/github

**Official Support:**
- GitHub Support: support.github.com
- Documentation: docs.github.com/copilot
- Status: githubstatus.com

**Emergency Issues:**
- Enterprise customers: Priority support
- Business customers: Standard support
- Individual: Community support

## Exam Tips

**Common Troubleshooting Scenarios in Exam:**

1. User can't see suggestions → Check auth and subscription
2. Slow performance → Network, close files, restart
3. Wrong suggestions → Improve context and prompts
4. Enterprise users can't access → Check seat assignment
5. Content exclusions not working → Check patterns, wait for propagation

**Remember:**
- First step is usually authentication/network
- Restart is often a valid solution
- Check logs for detailed errors
- Proxy/firewall are common corporate issues

## Next Steps

- Review [Study Guide](./12-study-guide.md)
- Read [Exam Tips](./15-exam-tips.md)
- Practice [Questions](./13-practice-questions.md)
- Review [Best Practices](./06-best-practices.md)

---

**Most issues are resolved by checking authentication and network connectivity!**
