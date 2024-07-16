import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), '/app/api/users.json');

const writeDataToFile = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading file users.json:', error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    let existingData = [];
    try {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      if (fileContent.trim().length > 0) {
        existingData = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Error reading file users.json:', error);
    }

    const highestId = existingData.reduce((maxId:number, user:any) => Math.max(user.id, maxId), 0);
    const newID = highestId + 1;

    body.id = newID;
    const newData = [...existingData, body];
    writeDataToFile(newData);
    return NextResponse.json({ body });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: error });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const userIdToUpdate = body.id;
  
  try {
    let existingData = [];
    try {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      if (fileContent.trim().length > 0) {
        existingData = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Error reading file users.json:', error);
    }

    const userIndex = existingData.findIndex((user: any) => user.id === userIdToUpdate);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    existingData[userIndex] = body;
    
    writeDataToFile(existingData);

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  try {
    let existingData = [];
    try {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      if (fileContent.trim().length > 0) {
        existingData = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Error reading file users.json:', error);
    }
    const userIdToDelete = body.id;
    const updatedData = existingData.filter((user: any) => user.id !== userIdToDelete);
    writeDataToFile(updatedData);
    return NextResponse.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error });
  }
}
