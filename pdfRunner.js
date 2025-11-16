const readline = require("readline");
const { exec } = require("child_process");
const path = require("path");

// Create prompt interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask a question (Promise)
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

(async () => {
  console.log("\n=== FAKE PDF URL Creator (.lnk) ===\n");

  const shortcutName = await ask("PDF name (no extension): ");
  const targetPath = await ask("Enter URL to open: ");
  const iconPath = await ask("Enter icon path (.ico) OR press Enter to skip: ");
  const saveFolder = await ask("Folder to save shortcut (e.g., C:\\Users\\Public\\Desktop): ");

  rl.close();

  const shortcutFile = path.join(saveFolder, `${shortcutName}.lnk`);

  // Escape backslashes for PowerShell
  const psShortcutFile = shortcutFile.replace(/\\/g, "\\\\");
  const psTarget = targetPath.replace(/\\/g, "\\\\");
  const psIcon = iconPath ? iconPath.replace(/\\/g, "\\\\") : "";

  // PowerShell script to create the shortcut
  const psScript = `
  $ws = New-Object -ComObject WScript.Shell;
  $s = $ws.CreateShortcut("${psShortcutFile}");
  $s.TargetPath = "${psTarget}";
  ${psIcon ? `$s.IconLocation = "${psIcon}";` : ""}
  $s.Save();
  `;

  console.log("\nCreating shortcut...");

  exec(`powershell -Command "${psScript}"`, (err) => {
    if (err) {
      console.error("\n❌ Error creating shortcut:", err);
      return;
    }

    console.log(`\n✔ Shortcut created successfully!`);
    console.log(`📄 Path: ${shortcutFile}\n`);
  });
})();
