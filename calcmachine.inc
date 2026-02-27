%define OP_NOP    0x00
%define OP_PUSH8  0x01
%define OP_PUSH16 0x02
%define OP_ADD    0x03
%define OP_SUB    0x04
%define OP_MUL    0x05
%define OP_DIV    0x06
%define OP_MOD    0x07
%define OP_NEG    0x08
%define OP_DUP    0x09
%define OP_CALL   0x0A
%define OP_RET    0x0B
%define OP_HALT   0x0C
%define OP_SQRT   0x0D
%define OP_POW    0x0E
%define OP_SIN    0x0F
%define OP_COS    0x10
%define OP_TAN    0x11
%define OP_AND    0x12
%define OP_OR     0x13
%define OP_XOR    0x14
%define OP_EQ     0x15
%define OP_LT     0x16
%define OP_GT     0x17
%define OP_JIF    0x18
%define OP_JMP    0x19

%macro pushv 1
    db OP_PUSH8, %1
%endmacro

%macro pushw 1
    db OP_PUSH16, %1
%endmacro

%macro call 1
    db OP_CALL, %1
%endmacro

%macro jif 1
    db OP_JIF, %1
%endmacro

%macro jmp 1
    db OP_JMP, %1
%endmacro

%define add  db OP_ADD
%define sub  db OP_SUB
%define mul  db OP_MUL
%define div  db OP_DIV
%define mod  db OP_MOD
%define neg  db OP_NEG
%define dup  db OP_DUP
%define ret  db OP_RET
%define halt db OP_HALT
%define sqrt db OP_SQRT
%define pow  db OP_POW
%define sin  db OP_SIN
%define cos  db OP_COS
%define tan  db OP_TAN
%define and  db OP_AND
%define or   db OP_OR
%define xor  db OP_XOR
%define eq   db OP_EQ
%define lt   db OP_LT
%define gt   db OP_GT