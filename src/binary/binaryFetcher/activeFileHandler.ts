import * as fs from "fs";
import { getActivePath, versionPath } from "../paths";
import { isBadVersion } from "./binaryValidator";

export default function handleActiveFile(): string | null {
  try {
    const activePath = getActivePath();
    if (fs.existsSync(activePath)) {
      const activeVersion = fs.readFileSync(activePath, "utf-8").trim();
      if (isBadVersion(activeVersion)) {
        return null;
      }

      const activeVersionPath = versionPath(activeVersion);
      if (fs.existsSync(activeVersionPath)) {
        return activeVersionPath;
      }
    }
  } catch (e) {
    console.error(
      "Error handling .active file. Falling back to semver sorting",
      e
    );
  }
  return null;
}
