# Computing+ Coursework

## Quick Start

### Dependencies
- NodeJS
- NPM
- Python
    - Django
    - djangorestframework
    - django-cors-headers
    - django-health-check

### Installation

#### Auto

```
$ cd /path/to/project
$ sh ./install.sh
$ sh ./build.sh
$ python3 main.py
```

#### Manual
1. Run install script `sh ./install.sh`
2. Compile files `cd methdealer; npm run build`
3. Start Python on port 5601 `cd ../methapis; python3 manage.py runserver 0:5601`
4. Create new terminal session
5. Start UI `cd ../methdealer; npm start`
6. Access UI on `http://localhost:3000`
