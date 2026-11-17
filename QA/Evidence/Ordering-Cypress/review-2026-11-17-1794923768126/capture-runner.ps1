param([Parameter(Mandatory=$true)][string]$OutputFile,[Parameter(Mandatory=$true)][int]$RunnerProcessId)
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System; using System.Runtime.InteropServices;
public class EZPostOwnWindow {
 [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left,Top,Right,Bottom; }
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h,out RECT r);
 [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
 [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h,int n);
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h,IntPtr dc,int flags);
}
'@
$runnerWindow=Get-Process -Id $RunnerProcessId
if ($runnerWindow.MainWindowHandle -eq 0 -or $runnerWindow.MainWindowTitle -notlike '*EZPost*') {throw 'Dedicated EZPost runner window was not confirmed'}
[EZPostOwnWindow]::ShowWindow($runnerWindow.MainWindowHandle,9) | Out-Null
[EZPostOwnWindow]::SetForegroundWindow($runnerWindow.MainWindowHandle) | Out-Null
$actualHandle=[EZPostOwnWindow]::GetForegroundWindow()
$bounds=New-Object EZPostOwnWindow+RECT
[EZPostOwnWindow]::GetWindowRect($runnerWindow.MainWindowHandle,[ref]$bounds) | Out-Null
$image=New-Object System.Drawing.Bitmap ($bounds.Right-$bounds.Left),($bounds.Bottom-$bounds.Top)
$graphics=[System.Drawing.Graphics]::FromImage($image)
$dc=$graphics.GetHdc()
$ok=[EZPostOwnWindow]::PrintWindow($runnerWindow.MainWindowHandle,$dc,2)
$graphics.ReleaseHdc($dc)
if(-not $ok){$graphics.Dispose();$image.Dispose();throw 'Own-window PrintWindow unavailable'}
$image.Save($OutputFile,[System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose();$image.Dispose()
[PSCustomObject]@{At=(Get-Date).ToUniversalTime().ToString('o');Expected=$runnerWindow.MainWindowHandle.ToInt64();Actual=$actualHandle.ToInt64();Foreground=($actualHandle -eq $runnerWindow.MainWindowHandle);Title=$runnerWindow.MainWindowTitle;OwnWindowCaptured=$ok}|ConvertTo-Json
