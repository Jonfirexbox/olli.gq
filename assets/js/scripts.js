(async () => {
    
    let user = 'user';
    let lineCount = 0;
    let acceptingCommands = false;
    let messages = ['Thanks for stopping by! If you\'d like to have a chat, use the `contact` command.'];
    let body = get('#body');
    get('#overlay').classList.remove('hide');
    
    await type(newLine(),
        'Welcome to olli.gq!\n' +
        `This site is pretty much just a little bit of fun for me.\n\n` +
               
        `Sadly, this site doesn't work on mobile. You're really missing out, ` +
        `so hop on PC to take a look!\n\n` +
        
        `If we haven't met each other before, hi, I'm olli. I develop ` +
        `cool things from time-to-time, and really like making weird ` +
        `things like this site.\n\n` +
        
        `You have ${messages.length} new message(s). Type \`messages\` ` +
        `to view them.\n\n` +
        
        `Type \`help\` for help.\n\n`,
    35);
    await wait(500);
    acceptCommands();
    
    function type (elem, text, spaceMs) {
        return new Promise(async (resolve) => {
            elem = elem ?? newLine();
            let array = text.split(' ');
            let chars = 0;
            for ( let i = 0; i < array.length; i++ ) {
                let word = array[i];
                if (!word.includes('\n')) {
                    if (chars + word.length > 55) {
                        elem.innerText += '\n';
                        chars = 0;
                    }
                    chars += word.length;
                } else {
                    chars = 0;
                }
                for ( let j = 0; j < word.length; j++ ) {
                    elem.innerText += word[j];
                    await wait(spaceMs);
                }
                elem.innerHTML += '&nbsp;';
                window.scrollTo(0, document.body.scrollHeight);
            }
            resolve(elem);
        });
    }
    
    function acceptCommands () {
        acceptingCommands = true;
        run();
        
        async function run () {
            if (acceptingCommands) {
                let response = await handle(await accept());
                if (response) {
                    await type(newLine(), response + '\n', 2);
                }
                await wait(350);
                run();
            }
        }
        
        async function handle (command) {
            let args = command.split(' ');
            switch (args[0]) {
                case '': {
                    return null;
                }
                case 'help': {
                    let text = `Commands:\n` +
                        `  help - view this message\n` +
                        `  projects - view my projects\n` +
                        `  contact - contact me :)\n` +
                        `  messages - view your messages\n` +
                        `  copyright - hmmmm`;
                    return text;
                }
                case 'projects': {
                    let projects = [
                        '  [Says @ says.lol]  A fun Discord bot that lets users play Simon Says games in their servers. Originally created for the YouTuber SoundDrout, but has now reaches over 9,000 communities globally.',
                        '  [Aunto @ aunto.xyz]  A highly-advanced privacy-respecting Discord verification bot built to protect communities from even the most advanced raids, attacks and malicious users. Aunto isn\'t your ordinary bot, and implements multiple fraud and malicious bot detection systems (most of which are custom-built by me).',
                    ];
                    return `I currently work on ${projects.length} project(s):\n\n${projects.join('\n\n')}`;
                }
                case 'contact': {
                    let l = newLine();
                    let lt = 'Gimme a second, I\'ve had to encrypt my contact details so pesky spam bots don\'t get ahold of it. So long as your computer wasn\'t built in the 1990s, this should be quite quick...\n';
                    await type(l, lt, 20);
                    await wait(1200);
                    return CryptoJS.AES.decrypt('U2FsdGVkX18zcp2jCFRg7NLPjO9BUWHGnAA8iN4uCNkLTN1C0KXYcdfqM3nDNCpkuP7OgyOoNPlxbBjZYQ0/Rw==', '#;w!n8#bn?ZlEX4,').toString(CryptoJS.enc.Utf8);
                }
                case 'messages': {
                    if (messages.length > 0) {
                        let text = `You have ${messages.length} message(s):\n\n`;
                        for ( let i = 0; i < messages.length; i++ ) {
                            text += `Message #${i + 1}:\n  ${messages[i]}`;
                        }
                        messages = [];
                        return text;
                    } else {
                        return 'You have no new messages.';
                    }
                }
                case 'copyright': {
                    let text =
                        `olli.gq - https://github.com/knokbak/olli.gq\n` +
                        `Copyright (c) olli, 2021. All rights reserved.\n\n` +
                        
                        `Of course I chose the MIT license!\n\n` +
                        
                        `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\n` +
                        
                        `The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\n` +
                        
                        `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n` +
                        
                        `Type \`imbored\` for more information.`;
                    return text;
                }
                case 'imbored': {
                    let text = '';
                    for ( let i = 0; i < 3 * 20; i++ ) {
                        text += 'brrrrrrrrrrrrr ';
                    }
                    return text;
                }
                case 'cat': {
                    switch (args[1]) {
                        case 'scripts.js':
                        case 'script.js': {
                            window.open('https://github.com/knokbak/olli.gq/blob/main/assets/js/script.js');
                            return 'Opening https://github.com/knokbak/olli.gq/blob/main/assets/js/script.js...';
                        }
                        case 'styles.css':
                        case 'style.css': {
                            window.open('https://github.com/knokbak/olli.gq/blob/main/assets/css/styles.css');
                            return 'Opening https://github.com/knokbak/olli.gq/blob/main/assets/css/styles.css...';
                        }
                        case 'index.html': {
                            window.open('https://github.com/knokbak/olli.gq/blob/main/index.html');
                            return 'Opening https://github.com/knokbak/olli.gq/blob/main/index.html...';
                        }
                        case 'LICENSE': {
                            window.open('https://github.com/knokbak/olli.gq/blob/main/LICENSE');
                            return 'Opening https://github.com/knokbak/olli.gq/blob/main/LICENSE...';
                        }
                        default: {
                            return 'cat: unknown file';
                        }
                    }
                }
                case 'sudo': {
                    if (user !== 'root') {
                        return 'You must be root to run sudo.';
                    }
                    args.shift();
                    return handle(args.join(' '));
                }
                case 'su': {
                    user = 'root';
                    return 'You think it\'d be that easy?\nYou\'d be right. Hello root!';
                }
                case 'whoami': {
                    return user;
                }
                case 'rm': {
                    if (user !== 'root') {
                        return 'Execution failed: access denied';
                    }
                    let files = [
                        '/var/www/olli.gq/index.html',
                        '/var/www/olli.gq/assets/css/styles.css',
                        '/var/www/olli.gq/assets/css/',
                        '/var/www/olli.gq/assets/js/scripts.js',
                        '/var/www/olli.gq/assets/js/',
                        '/var/www/olli.gq/assets/',
                        '/var/www/olli.gq/',
                        '/var/www/',
                        '/var/',
                        '/etc/nginx/sites-available/default',
                        '/etc/nginx/sites-available/',
                        '/etc/nginx/sites-enabled/default',
                        '/etc/nginx/sites-enabled/',
                        '/etc/nginx/conf.d/',
                        '/etc/nginx/private/olli.gq.crt',
                        '/etc/nginx/private/olli.gq.key',
                        '/etc/nginx/private/',
                        '/etc/nginx/fastcgi.conf',
                        '/etc/nginx/mime.types',
                        '/etc/nginx/nginx.config',
                        '/etc/nginx/proxy_params',
                        '/etc/nginx/scgi_params',
                        '/etc/nginx/uwsgi_params',
                        '/etc/nginx/win-utf',
                        '/etc/nginx/',
                        '/etc/ssh/ssh.conf',
                        '/etc/ssh/keys',
                        '/etc/ssh/',
                        '/etc/',
                        '/root/sys.conf',
                        '/root/',
                        '/kernal/sys1',
                        '/kernal/sys2',
                        '/kernal/sys3',
                        '/kernal/sys4',
                        '/kernal/sys5',
                        '/kernal/sys6',
                        '/kernal/boot',
                        '/kernal/bash',
                        '/kernal/',
                    ]
                    let text = '';
                    for ( let i = 0; i < files.length; i++ ) {
                        text += `del: ${files[i]}\n`;
                    }
                    text += `\n\nSession closed`;
                    acceptingCommands = false;
                    return text;
                }
                default: {
                    return 'Unknown command. Type `help` for help.';
                }
            }
        }
        
        async function accept () {
            let line = newCommandLine();
            let command = await waitForCommand(line);
            return command;
        }
    }
    
    function waitForCommand (elem) {
        return new Promise((resolve) => {
            let command = '';
            let allowed = 'abcdefghijklmnopqrstuvwxyz1234567890_-=+!@#/. ';
            window.addEventListener('keydown', handleEvent);
            
            function handleEvent (e) {
                let key = e.key.toLowerCase();
                if (allowed.includes(key)) {
                    command += key;
                    if (elem) {
                        if (key === ' ') {
                            elem.innerHTML += '&nbsp;';
                        } else {
                            elem.innerHTML += key;
                        }
                    }
                } else if (key === 'enter') {
                    finished();
                } else if (key === 'backspace') {
                    if (command.length > 0) {
                        let array = command.split('');
                        array.splice(array.length - 1);
                        command = array.join('');
                        elem.innerHTML = (`${user}@olli.gq ~# ` + command).replace(/ /g, '&nbsp;');
                    }
                }
            }
            
            function finished () {
                window.removeEventListener('keydown', handleEvent);
                resolve(command);
            }
        });
    }
    
    function newCommandLine () {
        let elem = newLine();
        elem.innerText = `${user}@olli.gq ~# `;
        window.scrollTo(0, document.body.scrollHeight);
        return elem;
    }
    
    function newLine () {
        let elem = document.createElement('p');
        elem.id = `line-${lineCount}`;
        lineCount++;
        body.appendChild(elem);
        window.scrollTo(0, document.body.scrollHeight);
        return elem;
    }
    
    function wait (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    
    function get (query) {
        return document.querySelector(query);
    }
    
})();
