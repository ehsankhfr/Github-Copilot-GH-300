# Practice Questions for GH-300 Exam

## Instructions

- Read each question carefully
- Select the best answer or all correct answers
- Check your answers at the end
- Review explanations for incorrect answers

---

## Section 1: Fundamentals (15 questions)

### Question 1
**What is the approximate size of GitHub Copilot's context window?**

A) 2,000 tokens  
B) 4,000 tokens  
C) 8,000 tokens  
D) 16,000 tokens

<details>
<summary>Answer</summary>
**C) 8,000 tokens**

Explanation: GitHub Copilot uses approximately 8,000 tokens for its context window, which includes code before and after the cursor position.
</details>

### Question 2
**Which of the following are officially supported IDEs for GitHub Copilot? (Select all that apply)**

A) Visual Studio Code  
B) Eclipse  
C) JetBrains IDEs  
D) Neovim  
E) Sublime Text  
F) Visual Studio

<details>
<summary>Answer</summary>
**A, C, D, F**

Explanation: Officially supported IDEs are VS Code, Visual Studio, JetBrains IDEs (IntelliJ, PyCharm, etc.), Neovim, and Azure Data Studio. Eclipse and Sublime Text are not officially supported.
</details>

### Question 3
**What technology powers GitHub Copilot's code suggestions?**

A) GitHub's proprietary AI  
B) OpenAI Codex  
C) Google's Bard  
D) Amazon CodeWhisperer

<details>
<summary>Answer</summary>
**B) OpenAI Codex**

Explanation: GitHub Copilot is powered by OpenAI Codex, which is a descendant of GPT-3 trained specifically on code.
</details>

### Question 4
**Which data is NOT sent to GitHub when using Copilot?**

A) Code snippets in the context window  
B) File type and language  
C) Complete repository contents  
D) Cursor position

<details>
<summary>Answer</summary>
**C) Complete repository contents**

Explanation: Copilot only sends the context window (code around your cursor), not entire files or repositories.
</details>

### Question 5
**What is the monthly cost of GitHub Copilot Business per user?**

A) $10  
B) $15  
C) $19  
D) $39

<details>
<summary>Answer</summary>
**C) $19**

Explanation: GitHub Copilot Business costs $19 per user per month. Individual is $10, and Enterprise is $39.
</details>

### Question 6
**Which tier includes GitHub Copilot Chat in the GitHub.com interface?**

A) Individual  
B) Business  
C) Enterprise  
D) All tiers

<details>
<summary>Answer</summary>
**C) Enterprise**

Explanation: Web-based Copilot Chat on GitHub.com is exclusive to the Enterprise tier.
</details>

### Question 7
**How does GitHub Copilot determine which suggestions to provide?**

A) Random selection from training data  
B) Analyzing context and ranking by relevance  
C) Using only the current line of code  
D) Based solely on programming language

<details>
<summary>Answer</summary>
**B) Analyzing context and ranking by relevance**

Explanation: Copilot analyzes the entire context window and ranks suggestions based on relevance, correctness, and patterns.
</details>

### Question 8
**What is the recommended action when reviewing Copilot suggestions?**

A) Accept all suggestions to save time  
B) Only review suggestions for security-critical code  
C) Always review all suggestions before accepting  
D) Suggestions don't need review

<details>
<summary>Answer</summary>
**C) Always review all suggestions before accepting**

Explanation: Best practice is to always review generated code for correctness, security, and appropriateness.
</details>

### Question 9
**Which of the following languages has the BEST support in GitHub Copilot?**

A) Haskell  
B) Python  
C) Assembly  
D) COBOL

<details>
<summary>Answer</summary>
**B) Python**

Explanation: Python is one of the most popular languages and has excellent support. Haskell, Assembly, and COBOL have limited support.
</details>

### Question 10
**What happens to code suggestions that are not accepted?**

A) They are stored for future reference  
B) They are used to improve the model immediately  
C) They are discarded  
D) They are shared with other users

<details>
<summary>Answer</summary>
**C) They are discarded**

Explanation: Rejected suggestions are not stored or used for immediate model improvement (though telemetry may track acceptance rates if opted in).
</details>

### Question 11
**For Business and Enterprise tiers, is private code used for model training?**

A) Yes, always  
B) Yes, but anonymized  
C) No  
D) Only with explicit permission

<details>
<summary>Answer</summary>
**C) No**

Explanation: For Business and Enterprise tiers, private code is NOT used for model training.
</details>

### Question 12
**What keyboard shortcut accepts a Copilot suggestion in VS Code?**

A) Enter  
B) Tab  
C) Ctrl/Cmd + Space  
D) Ctrl/Cmd + Enter

<details>
<summary>Answer</summary>
**B) Tab**

Explanation: Tab is the default keyboard shortcut to accept suggestions in all supported IDEs.
</details>

### Question 13
**Which component of Copilot's architecture interacts directly with the AI model?**

A) IDE Extension  
B) GitHub Copilot Service  
C) User's browser  
D) Git client

<details>
<summary>Answer</summary>
**B) GitHub Copilot Service**

Explanation: The architecture is: IDE Extension → GitHub Copilot Service → AI Model (Codex).
</details>

### Question 14
**What is the maximum response time typically expected for Copilot suggestions?**

A) 10-50ms  
B) 100-300ms  
C) 1-2 seconds  
D) 5-10 seconds

<details>
<summary>Answer</summary>
**B) 100-300ms**

Explanation: Typical response time for inline suggestions is 100-300ms, though it can vary based on network conditions.
</details>

### Question 15
**Which feature allows partial acceptance of suggestions word by word?**

A) Tab  
B) Enter  
C) Ctrl/Cmd + →  
D) Alt/Opt + →

<details>
<summary>Answer</summary>
**C) Ctrl/Cmd + →**

Explanation: Ctrl/Cmd + → (right arrow) accepts suggestions word by word for fine-grained control.
</details>

---

## Section 2: Features and Chat (15 questions)

### Question 16
**What does the /explain slash command do?**

A) Generates code examples  
B) Explains selected code or context  
C) Creates documentation  
D) Fixes errors

<details>
<summary>Answer</summary>
**B) Explains selected code or context**

Explanation: /explain provides plain language explanations of code functionality.
</details>

### Question 17
**Which chat agent searches across the entire workspace?**

A) @vscode  
B) @terminal  
C) @workspace  
D) @github

<details>
<summary>Answer</summary>
**C) @workspace**

Explanation: @workspace agent can search and analyze all files in your workspace.
</details>

### Question 18
**What is the keyboard shortcut to open inline chat in VS Code?**

A) Ctrl/Cmd + I  
B) Ctrl/Cmd + K  
C) Ctrl/Cmd + /  
D) Ctrl/Cmd + Shift + I

<details>
<summary>Answer</summary>
**A) Ctrl/Cmd + I**

Explanation: Ctrl/Cmd + I opens inline chat at the cursor position.
</details>

### Question 19
**Which slash command generates unit tests?**

A) /test  
B) /tests  
C) /unittest  
D) /generate-tests

<details>
<summary>Answer</summary>
**B) /tests**

Explanation: The /tests command generates unit tests for selected code.
</details>

### Question 20
**The @terminal agent helps with:**

A) Terminal configuration  
B) Command-line operations and explanations  
C) Terminal themes  
D) Shell scripting only

<details>
<summary>Answer</summary>
**B) Command-line operations and explanations**

Explanation: @terminal helps with CLI commands, error messages, and terminal-related tasks.
</details>

### Question 21
**What does the /fix command do?**

A) Fixes formatting issues only  
B) Suggests fixes for errors and issues  
C) Automatically applies fixes  
D) Fixes merge conflicts

<details>
<summary>Answer</summary>
**B) Suggests fixes for errors and issues**

Explanation: /fix suggests fixes for errors, bugs, and issues in the code.
</details>

### Question 22
**Which feature is available in the GitHub Copilot CLI?**

A) `gh copilot suggest`  
B) `gh copilot run`  
C) `gh copilot deploy`  
D) `gh copilot commit`

<details>
<summary>Answer</summary>
**A) `gh copilot suggest`**

Explanation: The CLI includes `gh copilot suggest` and `gh copilot explain` commands.
</details>

### Question 23
**What keyboard shortcut opens the Copilot suggestion panel in VS Code?**

A) Ctrl/Cmd + Space  
B) Ctrl/Cmd + Enter  
C) Alt/Opt + Enter  
D) Ctrl/Cmd + P

<details>
<summary>Answer</summary>
**B) Ctrl/Cmd + Enter**

Explanation: Ctrl/Cmd + Enter opens the panel showing multiple suggestions.
</details>

### Question 24
**Which of the following is NOT a valid slash command?**

A) /explain  
B) /tests  
C) /debug  
D) /fix

<details>
<summary>Answer</summary>
**C) /debug**

Explanation: Valid slash commands include /explain, /fix, /tests, and /help. /debug is not a standard command.
</details>

### Question 25
**The @vscode agent is used for:**

A) Code completion  
B) VS Code IDE configuration and features  
C) Version control  
D) Debugging

<details>
<summary>Answer</summary>
**B) VS Code IDE configuration and features**

Explanation: @vscode helps with VS Code-specific questions, settings, and features.
</details>

### Question 26
**What is the difference between inline chat and the chat panel?**

A) No difference, they're the same  
B) Inline appears at cursor, panel is persistent sidebar  
C) Inline is faster, panel is more detailed  
D) Inline is free, panel requires subscription

<details>
<summary>Answer</summary>
**B) Inline appears at cursor, panel is persistent sidebar**

Explanation: Inline chat (Ctrl/Cmd + I) appears at cursor for quick edits; panel is a persistent sidebar for longer conversations.
</details>

### Question 27
**Which tier includes mobile app support?**

A) Enterprise only  
B) Business and Enterprise  
C) All tiers  
D) Individual only

<details>
<summary>Answer</summary>
**C) All tiers**

Explanation: Mobile support is available in all tiers (Individual, Business, and Enterprise).
</details>

### Question 28
**Can you have multiple suggestions for the same code context?**

A) No, only one suggestion per context  
B) Yes, navigate with Alt/Opt + [ and ]  
C) Yes, but only in Enterprise  
D) Only with special configuration

<details>
<summary>Answer</summary>
**B) Yes, navigate with Alt/Opt + [ and ]**

Explanation: Copilot generates multiple ranked suggestions; navigate between them using Alt/Opt + [ and ].
</details>

### Question 29
**What does the /clear command do in chat?**

A) Clears selected code  
B) Clears the terminal  
C) Clears chat conversation history  
D) Clears Copilot cache

<details>
<summary>Answer</summary>
**C) Clears chat conversation history**

Explanation: /clear removes the current chat conversation to start fresh.
</details>

### Question 30
**GitHub Copilot Chat can:**

A) Execute code  
B) Modify files directly without permission  
C) Provide explanations and suggestions  
D) Access external APIs

<details>
<summary>Answer</summary>
**C) Provide explanations and suggestions**

Explanation: Chat provides explanations, suggestions, and code generation but cannot execute code or modify files without user approval.
</details>

---

## Section 3: Enterprise and Administration (10 questions)

### Question 31
**What is the cost of GitHub Copilot Enterprise per user per month?**

A) $19  
B) $29  
C) $39  
D) $49

<details>
<summary>Answer</summary>
**C) $39**

Explanation: GitHub Copilot Enterprise costs $39 per user per month.
</details>

### Question 32
**Which feature is exclusive to Enterprise tier?**

A) Inline suggestions  
B) Chat in IDE  
C) Pull request summaries  
D) Content exclusions

<details>
<summary>Answer</summary>
**C) Pull request summaries**

Explanation: PR summaries are exclusive to Enterprise. Content exclusions are available in Business and Enterprise.
</details>

### Question 33
**How long are audit logs retained in the GitHub UI by default?**

A) 30 days  
B) 60 days  
C) 90 days  
D) 180 days

<details>
<summary>Answer</summary>
**C) 90 days**

Explanation: Audit logs are retained for 90 days in the UI, but can be accessed longer via API.
</details>

### Question 34
**Content exclusions are configured using:**

A) File extensions only  
B) File path patterns  
C) Regular expressions only  
D) Line numbers

<details>
<summary>Answer</summary>
**B) File path patterns**

Explanation: Content exclusions use file path patterns like `secrets/**`, `*.key`, etc.
</details>

### Question 35
**Which tier includes organization-wide policy management?**

A) Individual  
B) Business and Enterprise  
C) Enterprise only  
D) All tiers

<details>
<summary>Answer</summary>
**B) Business and Enterprise**

Explanation: Organization policies are available in both Business and Enterprise tiers.
</details>

### Question 36
**What can be tracked in audit logs? (Select all that apply)**

A) Suggestion requests  
B) User access events  
C) Settings changes  
D) Individual code suggestions  
E) License assignments

<details>
<summary>Answer</summary>
**A, B, C, E**

Explanation: Audit logs track requests, access, settings changes, and license events, but not individual suggestion content.
</details>

### Question 37
**Documentation search is available in:**

A) All tiers  
B) Business tier  
C) Enterprise tier  
D) Individual tier

<details>
<summary>Answer</summary>
**C) Enterprise tier**

Explanation: Documentation search and summaries are exclusive to Enterprise.
</details>

### Question 38
**Seat management in an organization allows:**

A) Assigning and revoking user licenses  
B) Choosing user IDE preferences  
C) Controlling suggestion quality  
D) Managing code repositories

<details>
<summary>Answer</summary>
**A) Assigning and revoking user licenses**

Explanation: Seat management is for license allocation and revocation.
</details>

### Question 39
**Which ports must be open for GitHub Copilot to function?**

A) 80 and 443  
B) 22 and 443  
C) 8080 and 8443  
D) 3000 and 3001

<details>
<summary>Answer</summary>
**A) 80 and 443**

Explanation: Copilot requires outbound access to ports 80 (HTTP) and 443 (HTTPS).
</details>

### Question 40
**Knowledge bases in Enterprise allow:**

A) Public code indexing  
B) Internal repository indexing for better suggestions  
C) External API documentation  
D) Stack Overflow integration

<details>
<summary>Answer</summary>
**B) Internal repository indexing for better suggestions**

Explanation: Knowledge bases index internal repositories to provide organization-specific suggestions.
</details>

---

## Section 4: Security and Compliance (10 questions)

### Question 41
**For Business/Enterprise, is private code used for training?**

A) Yes  
B) No  
C) Only with permission  
D) Only anonymized data

<details>
<summary>Answer</summary>
**B) No**

Explanation: Private code from Business and Enterprise customers is NOT used for model training.
</details>

### Question 42
**Public code filtering can be set to:**

A) Block or Allow  
B) Block, Warn, or Allow  
C) Enable or Disable  
D) High, Medium, or Low

<details>
<summary>Answer</summary>
**B) Block, Warn, or Allow**

Explanation: Public code filter has three settings: Block (prevent matches), Warn (show warning), or Allow (no filtering).
</details>

### Question 43
**Which is NOT a recommended security practice?**

A) Always review generated code  
B) Use content exclusions for sensitive files  
C) Accept all suggestions quickly  
D) Enable public code filtering

<details>
<summary>Answer</summary>
**C) Accept all suggestions quickly**

Explanation: You should always review suggestions carefully, not accept them quickly without review.
</details>

### Question 44
**GDPR compliance requires:**

A) Data encryption only  
B) Right to access, deletion, and data minimization  
C) Annual audits  
D) Government approval

<details>
<summary>Answer</summary>
**B) Right to access, deletion, and data minimization**

Explanation: GDPR requires data subject rights including access, deletion, and data minimization principles.
</details>

### Question 45
**What should you do if credentials are accidentally committed?**

A) Delete the commit  
B) Rotate credentials immediately, remove from history, force push  
C) Just rotate credentials  
D) File a support ticket

<details>
<summary>Answer</summary>
**B) Rotate credentials immediately, remove from history, force push**

Explanation: Immediate action required: rotate credentials, clean history, force push, and document incident.
</details>

### Question 46
**Common vulnerabilities to watch for include: (Select all that apply)**

A) SQL injection  
B) Cross-site scripting (XSS)  
C) Hardcoded secrets  
D) Perfect code generation  
E) Path traversal

<details>
<summary>Answer</summary>
**A, B, C, E**

Explanation: Watch for SQL injection, XSS, hardcoded secrets, and path traversal. "Perfect code generation" is not a vulnerability.
</details>

### Question 47
**SOC 2 Type II certification covers:**

A) Security only  
B) Security, availability, processing integrity, confidentiality, privacy  
C) GDPR compliance  
D) ISO standards

<details>
<summary>Answer</summary>
**B) Security, availability, processing integrity, confidentiality, privacy**

Explanation: SOC 2 Type II covers the five trust service principles.
</details>

### Question 48
**Content exclusions should include: (Select all that apply)**

A) .env files  
B) *.key files  
C) Test files  
D) secrets/** directories  
E) All Python files

<details>
<summary>Answer</summary>
**A, B, D**

Explanation: Exclude sensitive files like .env, *.key, and secrets directories. Test files and all Python files shouldn't be excluded unless they contain sensitive data.
</details>

### Question 49
**Data transmission in Copilot uses:**

A) HTTP  
B) HTTPS/TLS  
C) FTP  
D) Unencrypted connection

<details>
<summary>Answer</summary>
**B) HTTPS/TLS**

Explanation: All data transmission is encrypted using HTTPS/TLS.
</details>

### Question 50
**Which compliance framework specifically addresses healthcare data?**

A) GDPR  
B) SOC 2  
C) HIPAA  
D) ISO 27001

<details>
<summary>Answer</summary>
**C) HIPAA**

Explanation: HIPAA (Health Insurance Portability and Accountability Act) specifically addresses healthcare/PHI data.
</details>

---

## Section 5: Best Practices (10 questions)

### Question 51
**What makes a good prompt for Copilot?**

A) Single word comments  
B) Specific, clear description with context  
C) No comments, just code  
D) Very long essays

<details>
<summary>Answer</summary>
**B) Specific, clear description with context**

Explanation: Good prompts are specific, clear, and provide adequate context including expected behavior.
</details>

### Question 52
**Type hints improve Copilot suggestions because:**

A) They make code look professional  
B) They provide type context for better understanding  
C) They are required by Copilot  
D) They don't affect suggestions

<details>
<summary>Answer</summary>
**B) They provide type context for better understanding**

Explanation: Type hints give Copilot more context about data types, leading to more accurate suggestions.
</details>

### Question 53
**If Copilot suggestions are slow, you should:**

A) Reinstall the IDE  
B) Check network connection, close unnecessary files, restart IDE  
C) Upgrade your computer  
D) Switch to a different tier

<details>
<summary>Answer</summary>
**B) Check network connection, close unnecessary files, restart IDE**

Explanation: Common troubleshooting steps for performance: check network, reduce open files, restart IDE.
</details>

### Question 54
**When adopting Copilot in a team, best practice is to:**

A) Enable for everyone immediately  
B) Pilot with small group, gather feedback, then roll out  
C) Let each developer decide individually  
D) Only enable for senior developers

<details>
<summary>Answer</summary>
**B) Pilot with small group, gather feedback, then roll out**

Explanation: Phased rollout with pilot group is best practice for organizational adoption.
</details>

### Question 55
**Code generated by Copilot should:**

A) Be accepted without review  
B) Always be reviewed for correctness and security  
C) Only be used for prototypes  
D) Be automatically trusted

<details>
<summary>Answer</summary>
**B) Always be reviewed for correctness and security**

Explanation: All generated code must be reviewed for correctness, security, and appropriateness.
</details>

### Question 56
**To get better suggestions for a specific framework:**

A) Train your own model  
B) Mention the framework in comments and use proper imports  
C) Switch IDEs  
D) Enable debug mode

<details>
<summary>Answer</summary>
**B) Mention the framework in comments and use proper imports**

Explanation: Explicitly mentioning frameworks and including proper imports provides better context.
</details>

### Question 57
**If Copilot is not showing suggestions, first check:**

A) Your code quality  
B) Authentication status and network connection  
C) Programming language  
D) Time of day

<details>
<summary>Answer</summary>
**B) Authentication status and network connection**

Explanation: First troubleshooting steps: verify you're signed in and have network connectivity.
</details>

### Question 58
**Which is a good practice for prompt engineering?**

A) Use vague descriptions  
B) Include examples of expected input/output  
C) Never use comments  
D) Keep prompts as short as possible

<details>
<summary>Answer</summary>
**B) Include examples of expected input/output**

Explanation: Including examples helps Copilot understand exactly what you want.
</details>

### Question 59
**Team adoption is most successful when:**

A) Forced on all developers  
B) Guidelines established, training provided, feedback collected  
C) Left completely optional  
D) Only used by junior developers

<details>
<summary>Answer</summary>
**B) Guidelines established, training provided, feedback collected**

Explanation: Successful adoption requires clear guidelines, proper training, and continuous feedback.
</details>

### Question 60
**To optimize IDE performance with Copilot:**

A) Disable all other extensions  
B) Close unnecessary files, exclude build folders, keep IDE updated  
C) Use minimal themes only  
D) Reduce screen resolution

<details>
<summary>Answer</summary>
**B) Close unnecessary files, exclude build folders, keep IDE updated**

Explanation: Performance optimization: reduce context size, exclude unnecessary folders, stay updated.
</details>

---

## Answer Key Summary

### Section 1: Fundamentals
1. C  2. A,C,D,F  3. B  4. C  5. C  
6. C  7. B  8. C  9. B  10. C  
11. C  12. B  13. B  14. B  15. C

### Section 2: Features and Chat
16. B  17. C  18. A  19. B  20. B  
21. B  22. A  23. B  24. C  25. B  
26. B  27. C  28. B  29. C  30. C

### Section 3: Enterprise and Administration
31. C  32. C  33. C  34. B  35. B  
36. A,B,C,E  37. C  38. A  39. A  40. B

### Section 4: Security and Compliance
41. B  42. B  43. C  44. B  45. B  
46. A,B,C,E  47. B  48. A,B,D  49. B  50. C

### Section 5: Best Practices
51. B  52. B  53. B  54. B  55. B  
56. B  57. B  58. B  59. B  60. B

---

## Scoring Guide

- **54-60 correct (90%+)**: Excellent! You're well-prepared
- **48-53 correct (80-89%)**: Good preparation, review missed topics
- **42-47 correct (70-79%)**: Passing level, study weak areas
- **Below 42 (< 70%)**: Review all materials and retake

## Next Steps

1. Review questions you got wrong
2. Study related documentation
3. Take practice exam again
4. Focus on weak areas
5. Review [Study Guide](./12-study-guide.md)
6. Read [Exam Tips](./15-exam-tips.md)

---

**Good luck with your preparation!**
