param([Parameter(Mandatory=$true)][string]$OutputFile)
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class OrderingWindowCapture {
 [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left,Top,Right,Bottom; }
 [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
 [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
 [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h,int n);
 [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h,IntPtr dc,int flags);
}
'@
$window = Get-Process -Id 5140
if ($window.MainWindowHandle -eq 0 -or $window.MainWindowTitle -notlike '*EZPost*') { throw 'Cypress-owned Firefox window not confirmed' }
$bounds = New-Object OrderingWindowCapture+RECT
[OrderingWindowCapture]::GetWindowRect($window.MainWindowHandle,[ref]$bounds) | Out-Null
$image = New-Object System.Drawing.Bitmap ($bounds.Right-$bounds.Left),($bounds.Bottom-$bounds.Top)
$graphics = [System.Drawing.Graphics]::FromImage($image)
$dc = $graphics.GetHdc()
$ok = [OrderingWindowCapture]::PrintWindow($window.MainWindowHandle,$dc,2)
$graphics.ReleaseHdc($dc)
if (-not $ok) { $graphics.Dispose(); $image.Dispose(); throw 'Own-window capture unavailable; never capture unrelated foreground pixels' }
$image.Save($OutputFile,[System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$image.Dispose()
