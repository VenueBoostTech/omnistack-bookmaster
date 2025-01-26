import { NextResponse } from "next/server";

// app/api/departments/[id]/route.ts
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
   ) {
    try {
      const userCount = await prisma.user.count({
        where: { departmentId: params.id }
      });
   
      if (userCount > 0) {
        return NextResponse.json({ 
          error: 'Cannot delete department with assigned users' 
        }, { status: 400 });
      }
   
      await prisma.department.delete({
        where: { id: params.id }
      });
   
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
    }
   }