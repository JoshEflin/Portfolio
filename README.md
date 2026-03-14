# Acknowledgements
  some of the back end logic (specifically the command parser is heavily influenced by the interpretter created in the book "Writing an Interpreter in Go" by Thorsten Ball
  it is however obviously not written in Go but the structure of the lexer and parser are very similar as I came up with the idea of making a REPL portfolio while reading the book
# User experience- WIP

When I land on the page I am greeting with a blinking terminal prompting a login
-- [Enter]. This will allow me to change the focus to the blinking terminal programatically eliminating the risk that a user must click an invisible input precisely
to be able to use the page. this will make people leave.

Refactor to front end only? fetch full strings, return text below slowly
-- Put the title screen and ascii images in the terminal component.. having the page rendered at build is not important, it doesnt cost much to render on the client


do I want a mailing list? opt-in only. 
    -- Get in touch page


Start off in JMUX. terminal on the right and front end on the left
user can opt into terminal mode or just click around. so its a live repl
and button clicks and mouse clicks are just aliases of eachother


When I am 'logged in' I can choose to init GUI mode which will be a bookshelf
 First I buld the back end of the portfolio then I build the front end
 the backend is already a front end so I stand on the shoulders of giants and echo the patterns of the past
 but and then sprinkle on the bit of salt I'm worth forever shaping the flavour of eternity!

The Command line-

- if I dont not init GUI mode then i can ls show dirs
- /opera
- /engineering
- /blog
- /about
  at / there is a surprise of some kind TBD

each of those pages is its on page on the bookshelf

The BiographicalBookShelf/ Menagerie-
all the same pages all part of a bookshelf
to progress through my timeline or regress,
use vim key bindings ( also arrow keys)
using } takes you to the next epoch(page)
perhaps there can be a loading screen with a wise quote and music
think witcher 3 loading

# Pages-

## engineering-
free lance work

trade tiger-- Trade tiger is being rebuilt with nextjs
sfm

nvim config
dotfiles
side projects

## Opera

literally enter the menagerie and walk around an environment with a few video of a performance
and pictures from the cruise ship.

## blogging

a Blog, minimal, sleek, with a personal touch

## Resume

But a life resume
This is a list of reasons why I would be awesome on your team.

# Phases

## 1
Terminal emulator  
Build the REPL
lexer and parser completed to level of MVP
command history and virtual file system
implement a test suite that I can trust

Build the Engineering Page ( emulate a markdown file) and Resume Page.

## 2
add GUI-MODE command, to dynamically change the page styling, from a terminal to a gui. 
consider keeping the terminal at the bottom, but can be unminimized?
Is that a good default?
consider using another framework just for the lulz. 
-- I am not sure what the two lines below mean...
HTML structure should stay the same
similiar to light mode dark mode, except with much more dynamic changes
-- It means -- mesage to old self-- who had forgotten himself- seek a way to 
Create dynamic change in the ui with a singular property. so that I can potentially expose an entire
UI per THEME. Ensure that  it's built on the same underlying component architecture to simplify.

consider adding in the ability to users to call commands to change colors in the gui.  can access terminal with :Command sytanx like in vim

## 3

learn a 3d rendering library and create the bookshelf
allow for parsing off additional commands to navigate users to different pages with keybindings.(this needs more thought)
