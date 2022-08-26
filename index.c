#include <stdio.h>
#include <string.h>
                            
int main(int argc, char const *argv[]){
    const char a[18] = {
        0x64, 0x56, 0x5f, 0x50, 
        0x5c, 0x5e, 0x56, 0x6c, 
        0x47, 0x5c, 0x6c, 0x60, 
        0x5a, 0x43, 0x50, 
        0x2, 0x2, 0x6
    };
    char flag[100];
    scanf("%s", flag);
    for (int i = 0; i < strlen(flag); i++){
        flag[i] ^= 51;
    }          
    if (!memcmp(a, flag, 18)){
        printf("Congratulations!");
    }
}