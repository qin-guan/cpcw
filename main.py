from subprocess import Popen
commands = [['sh', 'runPython.sh'], ['sh', 'runUI.sh']]
procs = [ Popen(i) for i in commands ]
for p in procs:
   p.wait()