import time
import sys
import frida


def on_message(a, b):
    print("on message ....... ")



# Android Application borrowed from 
# https://github.com/11x256/frida-android-examples/tree/master/examples/5


device = frida.get_usb_device()
pid = device.spawn(["com.example.a11x256.frida_test"])
device.resume(pid)
time.sleep(1) 
session = device.attach(pid)

# session = frida.get_usb_device().attach('com.example.a11x256.frida_test')
with open("aes-hook.js") as f:
    script = session.create_script(f.read())
script.on("message", on_message)
script.load()

sys.stdin.read()

