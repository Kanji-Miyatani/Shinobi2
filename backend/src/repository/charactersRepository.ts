import {Character,PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();
export const selectAll=async () : Promise<Character[]>=>{
    const allCharacters = await prisma.character.findMany({
    });
    return allCharacters;
}

export const selectOne=async (id :string | undefined) : Promise<Character | null>=>{
    const character = await prisma.character.findFirst({
        where:{
            id : id, 
        }
    })
    return character;
}

export  const create=async (character:Character)=>{
    await prisma.character.create({
        data: character,
      })
}

