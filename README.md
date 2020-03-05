# Computing+ Coursework

## Quick Start

### Dependencies
- NodeJS
- NPM
- Python
    - Django

### Installation

#### Auto

```
$ sh ./install.sh
$ sh ./build.sh
$ sh ./run.sh
```

#### Manual
1. Run install script `sh ./install.sh`
2. Compile files `cd methdealer; npm run build`
3. Start Python on port 5601 `cd ../methapis; python3 manage.py runserver 0:5601`
4. Start UI `cd ../methdealer; npm start`