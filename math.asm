%include "calcmachine.inc"

[org 0x0000]

start:
    pushv 2
    pushv 3
    pow            
    
    pushv 0
    sin            
    add             
    
    pushv 16
    sqrt           
    
    mul             
    halt