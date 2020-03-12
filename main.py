from subprocess import Popen
import webbrowser
commands = [['sh', 'runPython.sh'], ['sh', 'runUI.sh']]
procs = [ Popen(i) for i in commands ]
for p in procs:
   p.wait()

webbrowser.open("http://localhost:3000/")
